import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunSearch: (query: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose, onRunSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onRunSearch(searchTerm);
      onClose();
      setSearchTerm('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/50 to-amber-400/50 shadow-2xl">
        <div className="bg-[#12121c]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>CONSULTAR NOTICIA VS BIBLIA</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-[#1c1c2b] hover:bg-[#252538] border border-white/10 rounded-xl transition-all active:scale-90"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ej. Elecciones, devaluación del bolívar, diáspora, ollas de comida..."
                className="w-full bg-[#161626]/85 border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-sans shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-zinc-400 hover:text-white bg-[#1c1c2b] border border-white/10 rounded-xl transition-all active:scale-95"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={!searchTerm.trim()}
                className="px-5 py-2.5 font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 hover:opacity-90 disabled:opacity-40 text-black rounded-xl transition-all uppercase tracking-wider active:scale-95 shadow-md"
              >
                ANALIZAR CON IA
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

