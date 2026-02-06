import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { URLInput } from '@/components/URLInput';
import { RecipeCard } from '@/components/RecipeCard';
import { HowItWorks } from '@/components/HowItWorks';
import { SponsorSection } from '@/components/SponsorSection';
import { AdUnit } from '@/components/AdUnit';
import { extractRecipe } from '@/services/recipeExtractor';
import type { Recipe } from '@/types/recipe';

export function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const extractedRecipe = await extractRecipe(url);
      setRecipe(extractedRecipe);
    } catch {
      setError('Failed to extract recipe. Please try again or check the URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipe(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 print:bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden print:hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="text-center lg:text-left mb-10">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI-Powered Recipe Extraction
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Skip the Story,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                    Get the Recipe
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Tired of scrolling through life stories to find a recipe? Paste any recipe URL and get just the 
                  <span className="font-semibold text-gray-900"> ingredients</span> and 
                  <span className="font-semibold text-gray-900"> instructions</span> — clean, printable, and ready to cook.
                </p>
              </div>

              <URLInput onExtract={handleExtract} isLoading={isLoading} />

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Works with Any Recipe Site</span>
                </div>
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="hidden lg:block">
              <AdUnit size="sidebar" />
              <div className="mt-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> Popular Sites
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer transition-colors">
                      <span className="w-2 h-2 bg-orange-400 rounded-full" />
                      AllRecipes
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer transition-colors">
                      <span className="w-2 h-2 bg-orange-400 rounded-full" />
                      Food Network
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer transition-colors">
                      <span className="w-2 h-2 bg-orange-400 rounded-full" />
                      Bon Appétit
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer transition-colors">
                      <span className="w-2 h-2 bg-orange-400 rounded-full" />
                      Tasty
                    </li>
                    <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer transition-colors">
                      <span className="w-2 h-2 bg-orange-400 rounded-full" />
                      Pioneer Woman
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-12 print:hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Extracting Your Recipe...
              </h3>
              <p className="text-gray-600 mb-6">
                Our AI is reading through the page and pulling out just the good stuff.
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fetching page content</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Analyzing with AI...</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Formatting recipe</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <section className="py-12 print:hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Extraction Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Recipe Result */}
      {recipe && !isLoading && (
        <section className="py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Inline Ad before recipe */}
            <div className="mb-8 print:hidden">
              <AdUnit size="leaderboard" />
            </div>

            <RecipeCard recipe={recipe} onReset={handleReset} />

            {/* Inline Ad after recipe */}
            <div className="mt-8 print:hidden">
              <AdUnit size="inline" />
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {!recipe && !isLoading && (
        <>
          <AdUnit size="banner" className="max-w-5xl mx-auto mb-8 print:hidden" />
          <HowItWorks />
        </>
      )}

      {/* Sponsor Section */}
      {!recipe && !isLoading && <SponsorSection />}

      {/* Footer */}
      <Footer />

      {/* Print-only branding */}
      <div className="hidden print:block fixed bottom-4 right-4 text-xs text-gray-400">
        Extracted by RecipeExtract.com
      </div>
    </div>
  );
}
