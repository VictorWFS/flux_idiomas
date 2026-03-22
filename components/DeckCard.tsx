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
      // 💡 Mudou o fundo do card: Branco no claro, Slate no escuro
      className="group relative flex h-full flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/15 cursor-pointer overflow-hidden"
    >
      <div className="relative h-36 w-full overflow-hidden shrink-0">
        {/* 💡 Mudou o gradiente da imagem para não ficar uma faixa preta no modo claro */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10 transition-colors duration-300" />
        
        <img 
          src={deck.imageUrl} 
          alt={`Capa do deck ${deck.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <span className="absolute top-3 right-3 z-20 text-[10px] font-bold text-blue-800 dark:text-blue-200 bg-blue-100/80 dark:bg-blue-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-blue-500/30">
          {deck.cards} cards
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between p-5 pt-4 relative z-20">
        <div>
          {/* 💡 Mudou o texto do título para preto no claro e branco no escuro */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {deck.title}
          </h3>
          
          {/* 💡 Mudou a descrição */}
          <p className="text-sm text-slate-600 dark:text-white/60 mb-5 leading-relaxed">
            {deck.description}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex justify-between text-[10px] font-bold mb-1.5">
            <span className="text-slate-400 dark:text-white/40 uppercase tracking-widest">Seu Progresso</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{deck.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000"
              style={{ width: `${deck.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}   