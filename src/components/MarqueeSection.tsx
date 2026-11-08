import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export interface ShowcaseCard {
  src: string;
  link?: string;
  title: string;
  badge?: string;
}

// The original motion preview sites
const ORIGINAL_GIFS: string[] = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Row 1: Only adorixit.com is inserted at the front, with the original sites following
const ROW1_CARDS: ShowcaseCard[] = [
  {
    src: '/assets/adorix_live.png',
    link: 'https://adorixit.com',
    title: 'Adorix – Live Site',
    badge: 'adorixit.com',
  },
  ...ORIGINAL_GIFS.slice(0, 10).map((src) => ({
    src,
    title: '3D Motion Preview',
  })),
];

// Row 2: Remains the exact original websites as before
const ROW2_CARDS: ShowcaseCard[] = ORIGINAL_GIFS.slice(10).map((src) => ({
  src,
  title: '3D Motion Preview',
}));

const ROW1_TRIPLED = [...ROW1_CARDS, ...ROW1_CARDS, ...ROW1_CARDS];
const ROW2_TRIPLED = [...ROW2_CARDS, ...ROW2_CARDS, ...ROW2_CARDS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const currentOffset =
              (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  const renderCard = (card: ShowcaseCard, idx: number, prefix: string) => {
    const isClickable = Boolean(card.link);

    const CardInner = (
      <div className="relative w-full h-full overflow-hidden rounded-2xl group/card">
        <img
          src={card.src}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/card:scale-105"
        />

        {/* Live Badge for adorixit.com */}
        {card.badge && (
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#0C0C0C]/85 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium flex items-center gap-2 shadow-xl z-10 transition-all duration-200 group-hover/card:bg-[#0C0C0C] group-hover/card:border-white/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{card.badge}</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70 group-hover/card:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Hover overlay for adorixit.com */}
        {card.link && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-sm font-semibold truncate mr-2">
                {card.title}
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 shrink-0 bg-black/60 px-2 py-1 rounded-md">
                Visit Site ↗
              </span>
            </div>
          </div>
        )}
      </div>
    );

    if (isClickable && card.link) {
      return (
        <a
          key={`${prefix}-${idx}`}
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${card.title}`}
          className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#181818] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-lg border border-transparent hover:border-white/20 block"
        >
          {CardInner}
        </a>
      );
    }

    return (
      <div
        key={`${prefix}-${idx}`}
        className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#181818] flex-shrink-0"
      >
        {CardInner}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-6 sm:pt-10 pb-20 sm:pb-32 overflow-hidden w-full relative select-none"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves RIGHT on scroll (Features adorixit.com at the front) */}
        <div
          className="flex gap-3 w-max"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {ROW1_TRIPLED.map((card, idx) => renderCard(card, idx, 'row1'))}
        </div>

        {/* Row 2 - Moves LEFT on scroll (Original websites as before) */}
        <div
          className="flex gap-3 w-max"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {ROW2_TRIPLED.map((card, idx) => renderCard(card, idx, 'row2'))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
