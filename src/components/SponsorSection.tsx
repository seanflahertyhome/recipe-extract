import { cn } from '@/utils/cn';

interface SponsorSectionProps {
  className?: string;
}

const sponsors = [
  { name: 'KitchenAid', tier: 'gold', logo: '🍳' },
  { name: 'Whole Foods', tier: 'gold', logo: '🥬' },
  { name: 'Blue Apron', tier: 'silver', logo: '📦' },
  { name: 'Williams Sonoma', tier: 'silver', logo: '🍴' },
  { name: 'HelloFresh', tier: 'bronze', logo: '🥗' },
  { name: 'Lodge Cast Iron', tier: 'bronze', logo: '🫕' },
];

const tierColors = {
  gold: 'from-yellow-400 to-amber-500 ring-amber-200',
  silver: 'from-gray-300 to-gray-400 ring-gray-200',
  bronze: 'from-orange-300 to-orange-400 ring-orange-200',
};

export function SponsorSection({ className }: SponsorSectionProps) {
  return (
    <section id="sponsors" className={cn("py-16 bg-gradient-to-b from-white to-orange-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Sponsors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            RecipeExtract is made possible by our amazing sponsors who share our passion for making cooking accessible.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl ring-4",
                tierColors[sponsor.tier as keyof typeof tierColors]
              )}>
                {sponsor.logo}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                {sponsor.name}
              </span>
              <span className={cn(
                "text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-full",
                sponsor.tier === 'gold' && 'bg-amber-100 text-amber-700',
                sponsor.tier === 'silver' && 'bg-gray-100 text-gray-600',
                sponsor.tier === 'bronze' && 'bg-orange-100 text-orange-600'
              )}>
                {sponsor.tier}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-orange-200">
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Become a Sponsor
          </h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Join our community of sponsors and reach millions of home cooks. We offer flexible sponsorship tiers to fit your marketing goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
              View Sponsorship Tiers
            </button>
            <button className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors border-2 border-orange-400">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
