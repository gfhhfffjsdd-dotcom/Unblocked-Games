import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Terminal, Info, Play, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = ['All', ...new Set(gamesData.map(g => g.category))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen circuit-pattern relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neon-pink/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <Gamepad2 className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">NOVAPLAY</h1>
            <span className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase">Unblocked Portal</span>
          </div>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search game repository..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all font-mono text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-md">
            <Flame className="text-pink-500 w-4 h-4 animate-pulse" />
            <span className="text-xs font-mono font-medium text-pink-500 uppercase tracking-wider">Trending</span>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <Terminal className="text-cyan-400 w-4 h-4 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => setActiveGame(game)}
                className="group relative bg-[#151921] rounded-xl overflow-hidden neon-border cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-video relative overflow-hidden bg-black/50">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-mono text-cyan-400 border border-cyan-400/30 uppercase tracking-widest">
                      {game.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.6)]">
                      <Play className="text-slate-950 fill-slate-950 w-6 h-6 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">{game.title}</h3>
                    <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">{game.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter group-hover:text-green-500">System Ready</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center">
            <Info className="mx-auto text-white/10 w-12 h-12 mb-4" />
            <p className="text-white/40 font-mono italic">No modules found matching your current query.</p>
          </div>
        )}
      </main>

      {/* Game Player Overlay */}
      <AnimatePresence mode="wait">
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          >
            <div 
              className={`relative bg-[#151921] rounded-2xl border border-white/10 shadow-2xl flex flex-col transition-all duration-500 overflow-hidden ${
                isFullscreen ? 'fixed inset-0 w-screen h-screen rounded-none border-none' : 'w-full max-w-5xl h-[85vh]'
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 relative z-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <Play className="text-cyan-400 w-4 h-4 fill-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold leading-none">{activeGame.title}</h2>
                    <span className="text-xs text-white/40 font-mono tracking-wider">{activeGame.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5 text-white/60 group-hover:text-cyan-400" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveGame(null);
                      setIsFullscreen(false);
                    }}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <X className="w-5 h-5 text-white/60 group-hover:text-pink-500" />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black relative">
                <iframe
                  src={activeGame.url}
                  className="w-full h-full border-none shadow-inner"
                  title={activeGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {!isFullscreen && (
                <div className="p-4 border-t border-white/10 hidden md:block bg-[#0a0b10]">
                  <div className="flex items-center gap-4 text-xs font-mono text-white/30 uppercase tracking-widest">
                    <span>Protocol: Secure</span>
                    <span className="text-white/10">|</span>
                    <span>Direct Access Enabled</span>
                    <span className="text-white/10">|</span>
                    <span>Vibration: OFF</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-white/5 flex flex-col items-center gap-4 mt-20">
        <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
           <Terminal className="w-4 h-4 text-cyan-400" />
           <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Status: Nominal // Data Curated for Efficiency</span>
        </div>
        <p className="text-white/20 text-[10px]">&copy; 2026 NOVAPLAY. Curated with technical precision.</p>
      </footer>
    </div>
  );
}
