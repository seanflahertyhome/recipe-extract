import { cn } from '@/utils/cn';

interface AdUnitProps {
  size: 'banner' | 'sidebar' | 'inline' | 'leaderboard';
  className?: string;
}

const sizeClasses = {
  banner: 'h-24 sm:h-28',
  sidebar: 'h-64 w-full',
  inline: 'h-20',
  leaderboard: 'h-24 sm:h-32',
};

export function AdUnit({ size, className }: AdUnitProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <div className="text-center p-4">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-wide">Advertisement</span>
        </div>
        <p className="text-xs text-gray-400">Google AdSense</p>
        {/* 
          To enable Google AdSense, replace this placeholder with:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        */}
      </div>
    </div>
  );
}
