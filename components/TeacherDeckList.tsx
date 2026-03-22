"use client";

import { useState } from "react";
import Link from "next/link";

interface Deck {
  id: number;
  title: string;
  classDate: string;
  cards: number;
  xp: number;
  isNew: boolean;
}

export default function TeacherDecksList({ decks }: { decks: Deck[] }) {
  // Estado para guardar qual deck foi clicado (se for null, o modal está fechado)
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  return (
    <>
      {/* 1. A LISTA DE DECKS */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-blue-200 dark:[&::-webkit-scrollbar-thumb]:bg-blue-500/20 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
        {decks.map((deck) => (
          <div 
            key={deck.id} 
            onClick={() => setSelectedDeck(deck)} // Abre o modal com os dados deste deck
            className="group flex flex-col justify-center rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/5 p-4 transition-all hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:border-blue-300 dark:hover:border-blue-500/40 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white transition-colors">{deck.title}</h4>
                <p className="text-xs text-slate-500 dark:text-white/50 mt-1 transition-colors">
                  Aula <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors">[{deck.classDate}]</span>
                </p>
              </div>
              
              <span className="rounded-md bg-blue-100 dark:bg-blue-500/20 px-2 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 transition-colors">
                {deck.cards} cards
              </span>
            </div>
          </div>
        ))}
        
        {decks.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-slate-400 dark:text-white/40 text-sm transition-colors">Nenhum deck novo do professor no momento.</p>
          </div>
        )}
      </div>

      {/* 2. O MODAL DE DETALHES (Só aparece se tiver um selectedDeck) */}
      {selectedDeck && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 transition-colors"
          onClick={() => setSelectedDeck(null)} // Clicar fora fecha o modal
        >
          <div 
            className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-2xl relative transition-colors"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
          >
            {/* Botão de Fechar no topo direito */}
            <button 
              onClick={() => setSelectedDeck(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Cabeçalho do Modal */}
            <div className="mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 mb-4 transition-colors">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">{selectedDeck.title}</h3>
              <p className="text-sm text-slate-500 dark:text-white/50 transition-colors">Criado a partir da aula do dia {selectedDeck.classDate}</p>
            </div>

            {/* Recompensas / Status */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 text-center transition-colors">
                <p className="text-xs text-slate-500 dark:text-white/50 mb-1 transition-colors">Flashcards</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{selectedDeck.cards}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 p-3 text-center transition-colors">
                <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mb-1 transition-colors">Recompensa</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 transition-colors">+{selectedDeck.xp} XP</p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-3">
              <Link 
                href={`/study/${selectedDeck.id}`} // Direciona para o futuro Player de Flashcards
                className="w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-blue-500 shadow-lg shadow-blue-600/20"
              >
                Iniciar Agora
              </Link>
              <button 
                onClick={() => setSelectedDeck(null)}
                className="w-full rounded-xl bg-transparent py-3.5 text-center text-sm font-bold text-slate-500 dark:text-white/60 transition-colors hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              >
                Fazer Depois
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}