import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Globe, Eye } from 'lucide-react';
import { getThemeVisuals, ThemeVisualPair } from '../data/visuals';

interface ThematicDiptychProps {
  category: string;
}

export const ThematicDiptych: React.FC<ThematicDiptychProps> = ({ category }) => {
  const [visuals, setVisuals] = useState<ThemeVisualPair>(getThemeVisuals(category));
  const [isLoaded, setIsReady] = useState(false);

  useEffect(() => {
    // Smooth transition when category changes
    const nextVisuals = getThemeVisuals(category);
    setVisuals(nextVisuals);
    setIsReady(true);
  }, [category]);

  return (
    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-500/30 bg-black/60 shadow-inner group min-h-[160px] sm:min-h-[260px] md:min-h-[320px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={visuals.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 h-full"
        >
          {/* Past / Biblical Panel */}
          <div className="relative h-[120px] sm:h-[190px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-cyan-500/20">
            <motion.img
              src={visuals.biblicalImage}
              alt={visuals.biblicalCaption}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-cyan-400/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[8.5px] sm:text-[10px] font-mono text-cyan-300 shadow-md">
              <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 shrink-0" />
              <span className="font-bold uppercase tracking-wider">Bíblico Histórico</span>
            </div>

            <div className="absolute bottom-2 left-2 right-2 z-10 hidden md:block">
               <p className="text-[9px] text-zinc-400 font-mono bg-black/40 backdrop-blur-sm p-1 rounded">
                 {visuals.biblicalCaption}
               </p>
            </div>
          </div>

          {/* Present / Modern Panel */}
          <div className="relative h-[120px] sm:h-[190px] md:h-full overflow-hidden">
            <motion.img
              src={visuals.modernImage}
              alt={visuals.modernCaption}
              className={`w-full h-full object-cover object-center ${visuals.biblicalImage === visuals.modernImage ? 'grayscale sepia-[0.3] brightness-[0.7] opacity-60' : ''}`}
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-fuchsia-400/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[8.5px] sm:text-[10px] font-mono text-fuchsia-300 shadow-md">
              <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fuchsia-400 shrink-0" />
              <span className="font-bold uppercase tracking-wider">Actualidad Global</span>
            </div>

            <div className="absolute bottom-2 left-2 right-2 z-10 hidden md:block">
               <p className="text-[9px] text-zinc-400 font-mono bg-black/40 backdrop-blur-sm p-1 rounded text-right">
                 {visuals.modernCaption}
               </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Status Caption */}
      <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 z-20 flex items-center justify-between gap-2 text-[9px] sm:text-xs text-zinc-300 bg-black/85 backdrop-blur-md px-2.5 py-1 sm:p-2 rounded-lg sm:rounded-xl border border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <Eye className="w-3 h-3 text-cyan-400 shrink-0" />
          <p className="font-sans text-zinc-200 text-[9.5px] sm:text-xs truncate">
            {category === 'all'
              ? 'Díptico Editorial: Travesía y dispersión humana frente a las crisis de la historia.'
              : `${visuals.biblicalCaption} // ${visuals.modernCaption}`
            }
          </p>
        </div>
        <span className="text-[8px] sm:text-[9px] font-mono text-cyan-300 uppercase tracking-widest shrink-0 hidden xs:inline-block font-bold">
          ⚡ 32:9 ULTRA-WIDE
        </span>
      </div>
    </div>
  );
};
