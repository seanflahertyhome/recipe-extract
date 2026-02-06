import type { Recipe } from '@/types/recipe';

// Sample recipes that simulate LLM extraction results
const sampleRecipes: Record<string, Recipe> = {
  default: {
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies with a perfectly golden exterior.',
    prepTime: '15 min',
    cookTime: '12 min',
    totalTime: '27 min',
    servings: '24 cookies',
    ingredients: [
      { amount: '2¼', unit: 'cups', item: 'all-purpose flour' },
      { amount: '1', unit: 'tsp', item: 'baking soda' },
      { amount: '1', unit: 'tsp', item: 'salt' },
      { amount: '1', unit: 'cup', item: 'butter', notes: 'softened' },
      { amount: '¾', unit: 'cup', item: 'granulated sugar' },
      { amount: '¾', unit: 'cup', item: 'packed brown sugar' },
      { amount: '2', unit: 'large', item: 'eggs' },
      { amount: '1', unit: 'tsp', item: 'vanilla extract' },
      { amount: '2', unit: 'cups', item: 'chocolate chips' },
      { amount: '1', unit: 'cup', item: 'chopped walnuts', notes: 'optional' },
    ],
    instructions: [
      { step: 1, text: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.' },
      { step: 2, text: 'In a medium bowl, whisk together flour, baking soda, and salt. Set aside.' },
      { step: 3, text: 'In a large bowl, beat butter and both sugars until light and fluffy, about 3-4 minutes.' },
      { step: 4, text: 'Add eggs one at a time, beating well after each addition. Mix in vanilla extract.' },
      { step: 5, text: 'Gradually add flour mixture to butter mixture, mixing on low speed until just combined.' },
      { step: 6, text: 'Fold in chocolate chips and walnuts (if using) with a spatula.' },
      { step: 7, text: 'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.' },
      { step: 8, text: 'Bake for 9-12 minutes, or until edges are golden but centers look slightly underdone.' },
      { step: 9, text: 'Let cool on baking sheet for 5 minutes before transferring to a wire rack.' },
    ],
    sourceUrl: '',
    extractedAt: new Date().toISOString(),
  },
  pasta: {
    title: 'Creamy Garlic Tuscan Shrimp',
    description: 'Succulent shrimp in a creamy garlic parmesan sauce with sun-dried tomatoes and spinach.',
    prepTime: '10 min',
    cookTime: '20 min',
    totalTime: '30 min',
    servings: '4 servings',
    ingredients: [
      { amount: '1', unit: 'lb', item: 'large shrimp', notes: 'peeled and deveined' },
      { amount: '8', unit: 'oz', item: 'penne pasta' },
      { amount: '4', unit: 'cloves', item: 'garlic', notes: 'minced' },
      { amount: '1', unit: 'cup', item: 'heavy cream' },
      { amount: '½', unit: 'cup', item: 'chicken broth' },
      { amount: '¾', unit: 'cup', item: 'parmesan cheese', notes: 'freshly grated' },
      { amount: '½', unit: 'cup', item: 'sun-dried tomatoes', notes: 'drained and chopped' },
      { amount: '3', unit: 'cups', item: 'fresh spinach' },
      { amount: '2', unit: 'tbsp', item: 'olive oil' },
      { amount: '1', unit: 'tsp', item: 'Italian seasoning' },
      { amount: '', unit: '', item: 'Salt and pepper', notes: 'to taste' },
    ],
    instructions: [
      { step: 1, text: 'Cook pasta according to package directions. Drain and set aside, reserving ½ cup pasta water.' },
      { step: 2, text: 'Season shrimp with salt, pepper, and Italian seasoning.' },
      { step: 3, text: 'Heat olive oil in a large skillet over medium-high heat. Cook shrimp for 2 minutes per side until pink. Remove and set aside.' },
      { step: 4, text: 'In the same skillet, sauté garlic for 30 seconds until fragrant.' },
      { step: 5, text: 'Add heavy cream and chicken broth. Bring to a simmer and cook for 3 minutes.' },
      { step: 6, text: 'Stir in parmesan cheese until melted and smooth.' },
      { step: 7, text: 'Add sun-dried tomatoes and spinach. Cook until spinach is wilted, about 2 minutes.' },
      { step: 8, text: 'Return shrimp to the skillet along with the cooked pasta. Toss to coat.' },
      { step: 9, text: 'If sauce is too thick, add reserved pasta water a little at a time. Serve immediately.' },
    ],
    sourceUrl: '',
    extractedAt: new Date().toISOString(),
  },
  soup: {
    title: 'Homemade Chicken Noodle Soup',
    description: 'Comforting homemade chicken noodle soup with tender vegetables and herbs.',
    prepTime: '20 min',
    cookTime: '40 min',
    totalTime: '1 hour',
    servings: '8 servings',
    ingredients: [
      { amount: '2', unit: 'tbsp', item: 'olive oil' },
      { amount: '1', unit: 'lb', item: 'chicken breast', notes: 'boneless, skinless' },
      { amount: '3', unit: 'stalks', item: 'celery', notes: 'diced' },
      { amount: '3', unit: 'medium', item: 'carrots', notes: 'peeled and diced' },
      { amount: '1', unit: 'large', item: 'onion', notes: 'diced' },
      { amount: '4', unit: 'cloves', item: 'garlic', notes: 'minced' },
      { amount: '8', unit: 'cups', item: 'chicken broth' },
      { amount: '2', unit: 'cups', item: 'egg noodles' },
      { amount: '2', unit: 'bay leaves', item: '' },
      { amount: '1', unit: 'tsp', item: 'dried thyme' },
      { amount: '¼', unit: 'cup', item: 'fresh parsley', notes: 'chopped' },
      { amount: '', unit: '', item: 'Salt and pepper', notes: 'to taste' },
    ],
    instructions: [
      { step: 1, text: 'Heat olive oil in a large pot or Dutch oven over medium heat.' },
      { step: 2, text: 'Season chicken with salt and pepper. Cook for 6-7 minutes per side until golden. Remove and set aside.' },
      { step: 3, text: 'Add celery, carrots, and onion to the pot. Sauté for 5 minutes until softened.' },
      { step: 4, text: 'Add garlic and cook for 1 minute until fragrant.' },
      { step: 5, text: 'Pour in chicken broth and add bay leaves and thyme. Bring to a boil.' },
      { step: 6, text: 'Return chicken to the pot. Reduce heat and simmer for 20 minutes.' },
      { step: 7, text: 'Remove chicken and shred with two forks. Return to the pot.' },
      { step: 8, text: 'Add egg noodles and cook for 8-10 minutes until tender.' },
      { step: 9, text: 'Remove bay leaves. Stir in fresh parsley and adjust seasoning. Serve hot.' },
    ],
    sourceUrl: '',
    extractedAt: new Date().toISOString(),
  },
};

// Simulate LLM extraction with a delay
export async function extractRecipe(url: string): Promise<Recipe> {
  // Simulate network delay for LLM processing
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1500));

  // Determine which recipe to return based on URL keywords
  let recipeKey = 'default';
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('shrimp') || lowerUrl.includes('tuscan')) {
    recipeKey = 'pasta';
  } else if (lowerUrl.includes('soup') || (lowerUrl.includes('chicken') && lowerUrl.includes('noodle'))) {
    recipeKey = 'soup';
  } else if (lowerUrl.includes('cookie') || lowerUrl.includes('chocolate')) {
    recipeKey = 'default'; // cookies
  }

  const recipe = { ...sampleRecipes[recipeKey] };
  recipe.sourceUrl = url;
  recipe.extractedAt = new Date().toISOString();

  // Randomize the title slightly based on URL to make it feel more dynamic
  if (url.includes('best') || url.includes('perfect')) {
    recipe.title = `The Perfect ${recipe.title}`;
  } else if (url.includes('easy') || url.includes('simple')) {
    recipe.title = `Easy ${recipe.title}`;
  } else if (url.includes('grandma') || url.includes('mom')) {
    recipe.title = `Grandma's ${recipe.title}`;
  }

  return recipe;
}
