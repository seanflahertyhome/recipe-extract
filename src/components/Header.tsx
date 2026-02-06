import { cn } from '@/utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("bg-white border-b border-gray-100 sticky top-0 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                RecipeExtract
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Clean recipes, no clutter</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              How it Works
            </a>
            <a href="#sponsors" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Sponsors
            </a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md shadow-orange-200">
              Become a Sponsor
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
