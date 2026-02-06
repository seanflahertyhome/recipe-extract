import { useState } from 'react';
import { cn } from '@/utils/cn';
import type { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onReset: () => void;
  className?: string;
}

export function RecipeCard({ recipe, onReset, className }: RecipeCardProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const text = `${recipe.title}\n\n` +
      `Ingredients:\n${recipe.ingredients.map((i) => `• ${i.amount} ${i.unit} ${i.item}${i.notes ? ` (${i.notes})` : ''}`).join('\n')}\n\n` +
      `Instructions:\n${recipe.instructions.map((i) => `${i.step}. ${i.text}`).join('\n')}\n\n` +
      `Source: ${recipe.sourceUrl}`;
    
    await navigator.clipboard.writeText(text);
    alert('Recipe copied to clipboard!');
  };

  return (
    <div className={cn("bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none print:rounded-none", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 sm:p-8 text-white print:bg-white print:text-black print:border-b-2 print:border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 print:text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              {recipe.title}
            </h2>
            {recipe.description && (
              <p className="text-orange-100 print:text-gray-600">{recipe.description}</p>
            )}
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handleCopy}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              title="Copy to clipboard"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              title="Print recipe"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
            <button
              onClick={onReset}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              title="Extract another recipe"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Time badges */}
        {(recipe.prepTime || recipe.cookTime || recipe.totalTime || recipe.servings) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {recipe.prepTime && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg print:bg-gray-100 print:text-gray-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Prep: {recipe.prepTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg print:bg-gray-100 print:text-gray-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <span className="text-sm font-medium">Cook: {recipe.cookTime}</span>
              </div>
            )}
            {recipe.totalTime && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg print:bg-gray-100 print:text-gray-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Total: {recipe.totalTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg print:bg-gray-100 print:text-gray-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Serves: {recipe.servings}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center print:bg-gray-100 print:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checkedIngredients.has(index)}
                      onChange={() => toggleIngredient(index)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 print:hidden"
                    />
                    <span className={cn(
                      "text-gray-700 transition-colors",
                      checkedIngredients.has(index) && "line-through text-gray-400"
                    )}>
                      <span className="font-semibold text-gray-900 print:text-black">
                        {ingredient.amount} {ingredient.unit}
                      </span>{' '}
                      {ingredient.item}
                      {ingredient.notes && (
                        <span className="text-gray-500 text-sm"> ({ingredient.notes})</span>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center print:bg-gray-100 print:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </span>
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors print:bg-gray-200 print:text-gray-700",
                      checkedSteps.has(index)
                        ? "bg-green-500 text-white"
                        : "bg-orange-100 text-orange-600"
                    )}>
                      {checkedSteps.has(index) ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        instruction.step
                      )}
                    </span>
                    <div className="flex-1">
                      <input
                        type="checkbox"
                        checked={checkedSteps.has(index)}
                        onChange={() => toggleStep(index)}
                        className="hidden"
                      />
                      <p className={cn(
                        "text-gray-700 leading-relaxed transition-colors",
                        checkedSteps.has(index) && "text-gray-400"
                      )}>
                        {instruction.text}
                      </p>
                    </div>
                  </label>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Source */}
        <div className="mt-8 pt-6 border-t border-gray-100 print:border-gray-300">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Source:</span>{' '}
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline print:text-black"
            >
              {recipe.sourceUrl}
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Extracted on {new Date(recipe.extractedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
