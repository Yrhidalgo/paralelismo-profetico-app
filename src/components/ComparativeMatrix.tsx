import React, { useState } from 'react';
import { BIBLICAL_PARALLELS } from '../data/parallels';
import { Search, Filter, BookOpen, Newspaper, Sparkles, Zap, Layers } from 'lucide-react';
import { AdMobBanner } from './AdMobBanner';

export const ComparativeMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredParallels = BIBLICAL_PARALLELS.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.biblicalPassage.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.venezuelaNewsContext.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Matrix Controls Frosted Glass Gray Box */}
      <div className="relative rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-amber-500/40 shadow-2xl">
        <div className="bg-[#12121c]/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30 inline-flex items-center gap-1.5 mb-1.5">
                <Layers className="w-3 h-3 text-purple-400" />
                <span>VISTA DE SÍNTESIS COMPARATIVA</span>
              </span>
              <h2 className="text-xl sm:text-3xl font-black font-display text-white">
                Matriz Comparativa: <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">Biblia vs Actualidad</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-light">
                Cuadro sinóptico interactivo de episodios bíblicos y los hechos reportados por la prensa sobre Venezuela
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filtrar por texto..."
                  className="bg-[#171724]/90 backdrop-blur-md border border-cyan-500/30 focus:border-cyan-400 text-white placeholder-zinc-500 font-mono text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 bg-[#171724]/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-xs font-mono text-zinc-200">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent focus:outline-none text-zinc-100 cursor-pointer font-sans"
                >
                  <option value="all" className="bg-[#161622] text-white">Todas las Categorías</option>
                  <option value="exodus" className="bg-[#161622] text-white">Éxodo y Migración</option>
                  <option value="economy" className="bg-[#161622] text-white">Hiperinflación y Escasez</option>
                  <option value="justice" className="bg-[#161622] text-white">Opresión y Justicia</option>
                  <option value="solidarity" className="bg-[#161622] text-white">Solidaridad Comunitaria</option>
                  <option value="hope" className="bg-[#161622] text-white">Reconstrucción y Esperanza</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdMob Banner - Mitad de la Pantalla */}
      <AdMobBanner 
        adUnitId="ca-app-pub-2559338430231736/6882475219" 
        section="midpage" 
        sectionLabel="Matriz Comparativa" 
        positionLabel="Mitad de Pantalla" 
      />

      {/* Table Container in Frosted Glass Gray Style */}
      <div className="bg-[#12121c]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#161626]/90 text-zinc-300 border-b border-white/10 font-mono text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4 sm:p-5 min-w-[200px]">Tema / Paralelo</th>
                <th className="p-4 sm:p-5 min-w-[260px]">Pasaje y Contexto Bíblico</th>
                <th className="p-4 sm:p-5 min-w-[280px]">Situación Noticiosa en Venezuela</th>
                <th className="p-4 sm:p-5 min-w-[160px]">Diarios</th>
                <th className="p-4 sm:p-5 min-w-[220px]">Lección de Fe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-200">
              {filteredParallels.map((p) => (
                <tr key={p.id} className="hover:bg-[#181829]/60 transition-colors">
                  
                  {/* Theme */}
                  <td className="p-4 sm:p-5 font-semibold text-white align-top">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg inline-block uppercase font-bold">
                        {p.theme}
                      </span>
                      <div className="text-sm font-bold font-display text-white pt-1">
                        {p.title}
                      </div>
                    </div>
                  </td>

                  {/* Biblical Context */}
                  <td className="p-4 sm:p-5 align-top">
                    <div className="bg-[#181829]/70 backdrop-blur-md border border-cyan-500/20 rounded-xl p-3.5 shadow-sm space-y-2">
                      <div className="flex gap-3 items-start">
                        {p.biblicalPassage.imageUrl && (
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0 bg-black/60 relative">
                            <img
                              src={p.biblicalPassage.imageUrl}
                              alt={p.biblicalPassage.imageCaption || p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-mono font-bold text-cyan-300 text-xs mb-1 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{p.biblicalPassage.reference}</span>
                          </div>
                          <blockquote className="italic text-xs text-zinc-300 mb-1 border-l-2 border-cyan-400 pl-2 line-clamp-3 font-light">
                            "{p.biblicalPassage.text}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Venezuela News */}
                  <td className="p-4 sm:p-5 align-top">
                    <div className="bg-[#181829]/70 backdrop-blur-md border border-rose-500/20 rounded-xl p-3.5 shadow-sm space-y-1.5">
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="leading-snug">{p.venezuelaNewsContext.headline}</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        {p.venezuelaNewsContext.summary}
                      </p>
                    </div>
                  </td>

                  {/* Media Sources */}
                  <td className="p-4 sm:p-5 align-top">
                    <div className="flex flex-wrap gap-1">
                      {p.venezuelaNewsContext.mediaSources.map((source, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-[#141422] border border-white/10 text-zinc-300 rounded-md font-mono">
                          {source}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Lesson */}
                  <td className="p-4 sm:p-5 align-top text-xs text-zinc-200">
                    <div className="bg-[#181829]/70 backdrop-blur-md border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-2 shadow-sm font-light">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{p.reflection.slice(0, 150)}...</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AdMob Banner (Matriz Comparativa) */}
      <AdMobBanner section="matrix" sectionLabel="Matriz Comparativa" />

    </div>
  );
};


