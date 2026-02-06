import { useState } from 'react';
import { cn } from '@/utils/cn';

interface URLInputProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
  className?: string;
}

// Example URLs from real recipe sites that typically have JSON-LD structured data
const exampleUrls = [
  { label: '🐟 Smoked Salmon', url: 'https://honest-food.net/how-to-smoke-salmon-recipe/' },
  { label: '🍪 Cookies', url: 'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/' },
  { label: '🍝 Pasta', url: 'https://www.simplyrecipes.com/recipes/pasta_alla_norma/' },
  { label: '🍗 Roast Chicken', url: 'https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592' },
];

export function URLInput({ onExtract, isLoading, className }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com/recipe)');
      return;
    }

    onExtract(url);
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              placeholder="Paste a recipe URL here (e.g., https://allrecipes.com/...)"
              className={cn(
                "w-full pl-12 pr-4 py-4 text-base border-2 rounded-2xl bg-white transition-all duration-200",
                "focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400",
                error ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              )}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "px-8 py-4 font-semibold text-white rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg",
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-200 hover:shadow-xl hover:shadow-orange-300"
            )}
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Extracting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Extract Recipe</span>
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </form>

      {/* Example URLs */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleUrls.map((example) => (
            <button
              key={example.label}
              onClick={() => {
                setUrl(example.url);
                setError('');
                // Automatically trigger extraction for demo purposes
                onExtract(example.url);
              }}
              disabled={isLoading}
              className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
