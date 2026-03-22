"use client";

import Link from "next/link";

interface Deck {
  id: string;
  title: string;
  description: string;
  cards: number;
  progress: number;
  imageUrl: string;
}

export default function DeckCard({ deck }: { deck: Deck }) {
  return (
    <Link 
      href={`/study/${deck.id}`} 
      // 💡 Removi o min-h fixo alto e adicionei h-full para que todos fiquem alinhados
      className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/15 cursor-pointer overflow-hidden"
    >
      {/* 1. TOPO DO WIDGET: IMAGEM (Agora Menor: h-36) */}
      <div className="relative h-36 w-full overflow-hidden shrink-0">
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900 to-transparent z-10" />
        
        <img 
          src={deck.imageUrl} 
          alt={`Capa do deck ${deck.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Contador de Cards (Mais discreto) */}
        <span className="absolute top-3 right-3 z-20 text-[10px] font-bold text-blue-200 bg-blue-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-blue-500/30">
          {deck.cards} cards
        </span>
      </div>

      {/* 2. MEIO PARA BAIXO: TEXTO E PROGRESSO (Padding reduzido: p-5) */}
      <div className="flex-1 flex flex-col justify-between p-5 pt-4 relative z-20">
        <div>
          {/* Fonte reduzida para text-xl */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
            {deck.title}
          </h3>
          
          {/* Fonte reduzida para text-sm */}
          <p className="text-sm text-white/60 mb-5 leading-relaxed">
            {deck.description}
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="mt-auto pt-2">
          <div className="flex justify-between text-[10px] font-bold mb-1.5">
            <span className="text-white/40 uppercase tracking-widest">Seu Progresso</span>
            <span className="text-blue-400 font-extrabold">{deck.progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${deck.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}