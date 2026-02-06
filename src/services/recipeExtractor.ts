/**
 * Recipe Extractor Service
 * 
 * HOW IT WORKS:
 * 1. Takes a URL from the user
 * 2. Uses a CORS proxy to fetch the actual webpage HTML
 * 3. Parses the HTML looking for recipe data in two ways:
 *    a. JSON-LD structured data (most recipe sites use this for SEO)
 *    b. Common HTML patterns/microdata as fallback
 * 4. Extracts and formats the recipe into a clean structure
 * 
 * LIMITATIONS:
 * - CORS proxies can be slow or rate-limited
 * - Some sites block proxies
 * - In production, you'd want your own backend server
 * - For better extraction, you'd integrate an LLM API (OpenAI, etc.)
 */

import { Recipe, Ingredient, Instruction } from '../types/recipe';

// List of CORS proxies to try (free ones, may be rate-limited)
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

/**
 * Fetches HTML from a URL using CORS proxies
 */
async function fetchWithCorsProxy(url: string): Promise<string> {
  let lastError: Error | null = null;
  
  for (const proxy of CORS_PROXIES) {
    try {
      console.log(`🌐 Trying proxy: ${proxy}`);
      const response = await fetch(proxy + encodeURIComponent(url), {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const html = await response.text();
      console.log(`✅ Successfully fetched ${html.length} characters`);
      return html;
    } catch (error) {
      console.warn(`❌ Proxy failed: ${proxy}`, error);
      lastError = error as Error;
    }
  }
  
  throw new Error(`Failed to fetch URL. All proxies failed. Last error: ${lastError?.message}`);
}

/**
 * Extracts JSON-LD structured data from HTML
 * Most recipe websites include this for SEO/Google
 */
function extractJsonLd(html: string): any | null {
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const jsonText = match[1].trim();
      const data = JSON.parse(jsonText);
      
      // Handle arrays of JSON-LD objects
      const items = Array.isArray(data) ? data : [data];
      
      for (const item of items) {
        // Check if this is a Recipe type
        if (item['@type'] === 'Recipe') {
          console.log('📋 Found Recipe JSON-LD:', item);
          return item;
        }
        
        // Check @graph for Recipe
        if (item['@graph']) {
          const recipe = item['@graph'].find((g: any) => 
            g['@type'] === 'Recipe' || 
            (Array.isArray(g['@type']) && g['@type'].includes('Recipe'))
          );
          if (recipe) {
            console.log('📋 Found Recipe in @graph:', recipe);
            return recipe;
          }
        }
      }
    } catch (e) {
      // Invalid JSON, continue to next script tag
      console.warn('Failed to parse JSON-LD:', e);
    }
  }
  
  return null;
}

/**
 * Parses an ISO 8601 duration (PT1H30M) to human readable format
 */
function parseDuration(duration: string | undefined): string {
  if (!duration) return '';
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} min`);
  
  return parts.join(' ') || '';
}

/**
 * Parses ingredient text into structured format
 */
function parseIngredient(text: string): Ingredient {
  // Clean up the text
  const cleaned = text.trim().replace(/\s+/g, ' ');
  
  // Try to extract amount, unit, and item
  // Pattern: "1 1/2 cups all-purpose flour, sifted"
  const match = cleaned.match(/^([\d\/\.\s]+)?\s*(cups?|tbsp|tsp|tablespoons?|teaspoons?|oz|ounces?|lbs?|pounds?|g|grams?|kg|ml|liters?|quarts?|pints?|pieces?|cloves?|slices?|large|medium|small|whole)?\s*(.+?)(?:,\s*(.+))?$/i);
  
  if (match) {
    return {
      amount: (match[1] || '').trim(),
      unit: (match[2] || '').trim(),
      item: (match[3] || cleaned).trim(),
      notes: match[4]?.trim(),
    };
  }
  
  return {
    amount: '',
    unit: '',
    item: cleaned,
  };
}

/**
 * Converts JSON-LD recipe data to our Recipe format
 */
function jsonLdToRecipe(jsonLd: any, sourceUrl: string): Recipe {
  // Handle ingredients - can be strings or objects
  const ingredients: Ingredient[] = [];
  const rawIngredients = jsonLd.recipeIngredient || jsonLd.ingredients || [];
  
  for (const ing of rawIngredients) {
    if (typeof ing === 'string') {
      ingredients.push(parseIngredient(ing));
    } else if (ing.name) {
      ingredients.push({
        amount: ing.amount || '',
        unit: ing.unit || '',
        item: ing.name,
        notes: ing.notes,
      });
    }
  }
  
  // Handle instructions - can be strings, objects, or HowToSection
  const instructionTexts: string[] = [];
  const rawInstructions = jsonLd.recipeInstructions || [];
  
  function extractInstructionTexts(items: any[]) {
    for (const item of items) {
      if (typeof item === 'string') {
        instructionTexts.push(item.trim());
      } else if (item['@type'] === 'HowToStep') {
        instructionTexts.push(item.text?.trim() || item.name?.trim() || '');
      } else if (item['@type'] === 'HowToSection') {
        // Add section name as a header
        if (item.name) {
          instructionTexts.push(`**${item.name}**`);
        }
        if (item.itemListElement) {
          extractInstructionTexts(item.itemListElement);
        }
      } else if (item.text) {
        instructionTexts.push(item.text.trim());
      }
    }
  }
  
  if (Array.isArray(rawInstructions)) {
    extractInstructionTexts(rawInstructions);
  } else if (typeof rawInstructions === 'string') {
    // Split by newlines or periods for run-on instructions
    rawInstructions.split(/\n|(?<=\.)\s+(?=[A-Z])/).forEach((s: string) => {
      const trimmed = s.trim();
      if (trimmed) instructionTexts.push(trimmed);
    });
  }
  
  // Convert to Instruction[] format with step numbers
  const instructions: Instruction[] = instructionTexts
    .filter(Boolean)
    .map((text, index) => ({ step: index + 1, text }));
  
  // Handle servings
  let servings = '';
  if (jsonLd.recipeYield) {
    servings = Array.isArray(jsonLd.recipeYield) 
      ? jsonLd.recipeYield[0] 
      : String(jsonLd.recipeYield);
  }
  
  // Note: Image URL is available in jsonLd.image but not currently used in our Recipe type
  
  return {
    title: jsonLd.name || 'Untitled Recipe',
    description: jsonLd.description || '',
    prepTime: parseDuration(jsonLd.prepTime),
    cookTime: parseDuration(jsonLd.cookTime),
    totalTime: parseDuration(jsonLd.totalTime),
    servings,
    ingredients,
    instructions,
    sourceUrl,
    extractedAt: new Date().toISOString(),
  };
}

/**
 * Fallback: Extract recipe from HTML using common patterns
 */
function extractFromHtml(html: string, sourceUrl: string): Recipe | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Try to find recipe title
  let title = '';
  const titleSelectors = [
    'h1.recipe-title',
    'h1.entry-title',
    '.recipe-name h1',
    'h1[itemprop="name"]',
    '.wprm-recipe-name',
    'h2.wprm-recipe-name',
    'article h1',
    'h1',
  ];
  
  for (const selector of titleSelectors) {
    const el = doc.querySelector(selector);
    if (el?.textContent?.trim()) {
      title = el.textContent.trim();
      break;
    }
  }
  
  // Try to find ingredients
  const ingredients: Ingredient[] = [];
  const ingredientSelectors = [
    '.recipe-ingredients li',
    '.ingredients li',
    '[itemprop="recipeIngredient"]',
    '.wprm-recipe-ingredient',
    '.ingredient-list li',
    '.recipe-ingred_txt',
  ];
  
  for (const selector of ingredientSelectors) {
    const elements = doc.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(el => {
        const text = el.textContent?.trim();
        if (text) {
          ingredients.push(parseIngredient(text));
        }
      });
      break;
    }
  }
  
  // Try to find instructions
  const instructionTexts: string[] = [];
  const instructionSelectors = [
    '.recipe-instructions li',
    '.instructions li',
    '[itemprop="recipeInstructions"] li',
    '.wprm-recipe-instruction',
    '.recipe-direction',
    '.step-text',
  ];
  
  for (const selector of instructionSelectors) {
    const elements = doc.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(el => {
        const text = el.textContent?.trim();
        if (text) {
          instructionTexts.push(text);
        }
      });
      break;
    }
  }
  
  // Convert to Instruction[] format
  const instructions: Instruction[] = instructionTexts.map((text, index) => ({
    step: index + 1,
    text,
  }));
  
  if (!title && ingredients.length === 0 && instructions.length === 0) {
    return null;
  }
  
  return {
    title: title || 'Recipe',
    description: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: '',
    ingredients,
    instructions,
    sourceUrl,
    extractedAt: new Date().toISOString(),
  };
}

/**
 * Main function: Extract recipe from a URL
 */
export async function extractRecipe(url: string): Promise<Recipe> {
  console.log('🔍 Starting recipe extraction for:', url);
  
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL. Please enter a valid website address.');
  }
  
  // Fetch the webpage
  console.log('📥 Fetching webpage...');
  const html = await fetchWithCorsProxy(url);
  
  // Try to extract JSON-LD first (most reliable)
  console.log('🔎 Looking for JSON-LD structured data...');
  const jsonLd = extractJsonLd(html);
  
  if (jsonLd) {
    console.log('✅ Found structured recipe data!');
    return jsonLdToRecipe(jsonLd, url);
  }
  
  // Fallback to HTML parsing
  console.log('⚠️ No JSON-LD found, trying HTML parsing...');
  const recipe = extractFromHtml(html, url);
  
  if (recipe && (recipe.ingredients.length > 0 || recipe.instructions.length > 0)) {
    console.log('✅ Extracted recipe from HTML');
    return recipe;
  }
  
  // Nothing found
  throw new Error(
    'Could not find recipe data on this page. ' +
    'The website may not have structured recipe data, or it may be blocking our request. ' +
    'Try a different recipe URL from a major cooking site like AllRecipes, Food Network, or Serious Eats.'
  );
}
