"use client";

import { useState, useEffect } from "react";

export type SpokenWord = { word: string; correct: boolean };

interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
  isRecording: boolean;
  onRecordStart: (e: React.MouseEvent) => void;
  onPlayAudio: (e: React.MouseEvent) => void;
  spokenFeedback: SpokenWord[] | null;
}

export default function Flashcard({ 
  front, back, isFlipped, onFlip, 
  isRecording, onRecordStart, onPlayAudio, spokenFeedback 
}: FlashcardProps) {
  
  const [showBackText, setShowBackText] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      setTimeout(() => setShowBackText(true), 150);
    } else {
      setTimeout(() => setShowBackText(false), 150);
    }
  }, [isFlipped]);

  return (
    <div className="relative h-80 w-full max-w-2xl cursor-pointer perspective-1000 mx-auto group">
      
      {/* Efeito de brilho externo */}
      <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-20 dark:opacity-30 transition-all duration-500 ${isFlipped ? 'bg-indigo-500' : 'bg-blue-500'}`}></div>

      <div 
        className={`relative h-full w-full rounded-3xl shadow-2xl transition-all duration-700 ease-out transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* LADO DA FRENTE (Inglês) */}
        <div 
          // 💡 Modo claro: bg-white e borda cinza. Modo escuro: gradiente slate.
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-8 backface-hidden transition-colors duration-300"
          style={{ backfaceVisibility: "hidden" }}
          onClick={onFlip} 
        >
          <span className="absolute top-6 left-6 text-xs font-bold text-emerald-600/70 dark:text-emerald-400/50 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            Inglês
          </span>

          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={onPlayAudio}
              className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-slate-500 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            </button>
            
            <button 
              onClick={onRecordStart}
              className={`p-3 rounded-full transition-all border ${
                isRecording 
                  ? "bg-red-100 dark:bg-red-500/20 text-red-500 dark:text-red-400 border-red-300 dark:border-red-500/50 animate-pulse" 
                  : "bg-slate-100 dark:bg-white/5 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-slate-500 dark:text-white/50 hover:text-emerald-600 dark:hover:text-emerald-400 border-transparent"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
          </div>
          
          {spokenFeedback ? (
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-4">
              {spokenFeedback.map((item, i) => (
                <span key={i} className={`text-3xl font-bold transition-colors ${item.correct ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400 border-b-2 border-red-500/50'}`}>
                  {item.word}
                </span>
              ))}
            </div>
          ) : (
            // 💡 Texto em preto no claro e branco no escuro
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mt-4 leading-relaxed transition-colors">{front}</h2>
          )}
          
          <div className="absolute bottom-6 flex items-center gap-2 text-slate-400 dark:text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span className="text-sm">Toque para ver a tradução</span>
          </div>
        </div>

        {/* VERSO (Tradução) */}
        <div 
          // 💡 Fundo azul bem clarinho no light mode, gradiente roxo no dark mode
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-purple-900/50 dark:to-slate-900 p-8 backface-hidden rotate-y-180 transition-colors duration-300"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          onClick={onFlip} 
        >
          {showBackText && (
            <>
              <span className="absolute top-6 left-6 text-xs font-bold text-indigo-500 dark:text-indigo-400/70 uppercase tracking-widest flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                Português
              </span>
              <h2 className="text-3xl font-bold text-indigo-950 dark:text-indigo-100 text-center mb-6 leading-relaxed">{back}</h2>
              <div className="absolute bottom-6 flex items-center gap-2 text-indigo-400 dark:text-indigo-200/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span className="text-sm">Toque para voltar ao inglês</span>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}