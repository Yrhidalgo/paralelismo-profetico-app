import React, { useEffect } from 'react';
import { 
  showSectionBanner, 
  removeBanner, 
  ADMOB_CONFIG, 
  isCapacitorNative, 
  AdSection, 
  SECTION_NAMES,
  getSectionAdUnitId 
} from '../services/admobService';
import { ShieldCheck, Info } from 'lucide-react';

interface AdMobBannerProps {
  className?: string;
  section?: AdSection;
  sectionLabel?: string;
  adUnitId?: string;
  positionLabel?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ 
  className = '', 
  section = 'midpage' as const,
  sectionLabel,
  adUnitId,
  positionLabel = 'Mitad de la Pantalla'
}) => {
  const isNative = isCapacitorNative();
  const currentSection: AdSection = (section as AdSection) || 'midpage';
  const displayName = sectionLabel || SECTION_NAMES[currentSection] || 'Mitad de Pantalla';
  const productionAdUnitId = adUnitId || getSectionAdUnitId(currentSection, adUnitId);

  useEffect(() => {
    if (isNative) {
      showSectionBanner(currentSection);
    }

    return () => {
      if (isNative) {
        removeBanner();
      }
    };
  }, [isNative, currentSection]);

  return (
    <div 
      id={`admob-${section}-banner-container`}
      className={`w-full flex flex-col items-center justify-center my-4 sm:my-6 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] ${className}`}
      aria-label={`Bloque publicitario Google AdMob - ${displayName}`}
    >
      {/* Contenedor visual del banner de prueba */}
      <div className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[728px] bg-[#111113] border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-lg flex flex-col items-center justify-between min-h-[55px] text-center relative overflow-hidden group">
        
        {/* Encabezado del Anuncio */}
        <div className="w-full flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono text-zinc-400 border-b border-white/5 pb-1 sm:pb-1.5 mb-1 sm:mb-1.5 px-1">
          <span className="flex items-center gap-1 text-[#c5a059] font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
            Anuncio AdMob ({positionLabel})
          </span>
          <span className="bg-[#1c1c1f] text-zinc-300 px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] border border-white/5">
            Test Mode (Android)
          </span>
        </div>

        {/* Cuerpo del Anuncio de Prueba */}
        <div className="w-full py-1.5 sm:py-2 flex flex-row items-center justify-center gap-2 sm:gap-3 text-zinc-300">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] font-serif font-bold text-xs sm:text-sm shrink-0">
            Ad
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">
              Google AdMob Banner • {displayName}
            </p>
            <p className="text-[9.5px] sm:text-[10px] text-zinc-400 font-mono truncate">
              Ad Unit: {ADMOB_CONFIG.isTesting ? ADMOB_CONFIG.testBannerId : productionAdUnitId}
            </p>
          </div>
          <div className="shrink-0 hidden sm:flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-[#0c0c0e] px-2 py-1 rounded border border-white/5">
            <Info className="w-3 h-3 text-zinc-400" />
            <span>320×50 Adaptable</span>
          </div>
        </div>

        {/* Nota informativa al pie del banner */}
        <div className="w-full pt-1 sm:pt-1.5 border-t border-white/5 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-zinc-400 px-1">
          <span>Posición: {positionLabel}</span>
          <span>ID: ca-app-pub-2559338430231736/6882475219</span>
        </div>

      </div>
    </div>
  );
};

