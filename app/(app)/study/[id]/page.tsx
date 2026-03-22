"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Flashcard, { SpokenWord } from "@/components/Flashcard";
import { Grade } from "@/lib/srs"; 

const mockCards = [
  { id: 1, front: "The book is on the table", back: "O livro está sobre a mesa" },
  { id: 2, front: "I would like a cup of coffee", back: "Eu gostaria de uma xícara de café" },
  { id: 3, front: "How much does it cost?", back: "Quanto isso custa?" },
];

export default function StudySessionPage() {
  const params = useParams();
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasViewedBack, setHasViewedBack] = useState(false); 
  const [isFinished, setIsFinished] = useState(false);
  
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitStep, setExitStep] = useState(1);
  
  const [isRecording, setIsRecording] = useState(false);
  const [spokenFeedback, setSpokenFeedback] = useState<SpokenWord[] | null>(null);

  const currentCard = mockCards[currentIndex];
  const progressPercentage = ((currentIndex) / mockCards.length) * 100;
  const remainingCards = mockCards.length - currentIndex;
  const focusPointsLost = 5; 

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    alert("🔊 [Mock] A IA falaria a frase com sotaque nativo perfeito agora.");
  };

  const handleRecordStart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsRecording(true);
    setSpokenFeedback(null);
    setTimeout(() => {
      setIsRecording(false);
      const words = currentCard.front.split(" ");
      const feedback = words.map(w => ({ word: w, correct: Math.random() > 0.25 }));
      setSpokenFeedback(feedback);
    }, 2000);
  };

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) setHasViewedBack(true);
  };

  const handleAnswer = (grade: Grade) => {
    if (currentIndex < mockCards.length - 1) {
      setIsFlipped(false); 
      setHasViewedBack(false); 
      setSpokenFeedback(null); 
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 150); 
    } else {
      setIsFinished(true); 
    }
  };

  if (isFinished) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -z-10" />
        {/* 💡 text-slate-900 no claro */}
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Sessão Concluída! 🎉</h2>
        <p className="text-slate-600 dark:text-white/50 mb-8 max-w-sm">Os cards que você teve dificuldade já foram separados para amanhã.</p>
        <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] flex-col w-full max-w-4xl mx-auto pt-6 lg:pt-0 relative">
      
      {/* LUZES DE FUNDO */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 opacity-30 dark:opacity-20 ${isFlipped ? 'bg-indigo-300 dark:bg-indigo-600' : 'bg-blue-300 dark:bg-blue-600'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 opacity-30 dark:opacity-20 ${isFlipped ? 'bg-purple-300 dark:bg-purple-600' : 'bg-emerald-300 dark:bg-emerald-600'}`} />
      </div>

      {/* 1. HEADER */}
      <div className="flex items-center gap-3 sm:gap-4 mb-10 px-4 w-full">
        <button 
          onClick={() => { setShowExitModal(true); setExitStep(1); }} 
          className="p-2 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-white/5 shrink-0"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="flex-1 flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Progresso</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {currentIndex + 1} <span className="text-slate-400 dark:text-white/40 font-medium">/ {mockCards.length}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
          <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 12s2.5-3 5-3c2.5 0 2.5 3 5 3s2.5-3 5-3c2.5 0 5 3 5 3M2 17s2.5-3 5-3c2.5 0 2.5 3 5 3s2.5-3 5-3c2.5 0 5 3 5 3" /></svg>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">3</span>
        </div>
      </div>

      {/* 2. CARTA */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full relative">
        <Flashcard 
          front={currentCard.front} back={currentCard.back} isFlipped={isFlipped} onFlip={handleToggleFlip} 
          isRecording={isRecording} onRecordStart={handleRecordStart} onPlayAudio={handlePlayAudio} spokenFeedback={spokenFeedback}
        />
      </div>

      {/* 3. CONTROLES */}
      <div className="h-32 mt-12 px-4 flex flex-col items-center justify-center w-full">
        {!hasViewedBack && spokenFeedback && (
          <div className="animate-in fade-in slide-in-from-bottom-2 text-center">
            <p className="text-sm font-bold text-slate-600 dark:text-white/60 mb-3">Você pode <span className="text-emerald-600 dark:text-emerald-400">Tentar de Novo</span> (no microfone) ou tocar na carta.</p>
          </div>
        )}

        {hasViewedBack && (
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
            <p className="text-center text-xs font-bold text-slate-500 dark:text-white/40 mb-3 uppercase tracking-wider">{isFlipped ? "Como foi o seu desempenho?" : "Avalie para ir ao próximo card"}</p>
            <div className="flex w-full gap-2 sm:gap-4">
              <button onClick={() => handleAnswer("muito_dificil")} className="flex-1 py-3 px-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-xs sm:text-sm font-bold">Muito Difícil</button>
              <button onClick={() => handleAnswer("dificil")} className="flex-1 py-3 px-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors text-xs sm:text-sm font-bold">Difícil</button>
              <button onClick={() => handleAnswer("mais_ou_menos")} className="flex-1 py-3 px-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors text-xs sm:text-sm font-bold">Mais ou menos</button>
              <button onClick={() => handleAnswer("facil")} className="flex-1 py-3 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors text-xs sm:text-sm font-bold">Fácil</button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE DESISTÊNCIA (Adaptado para Light Mode) */}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            
            {exitStep === 1 ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">Tem certeza que deseja interromper o estudo?</h3>
                <p className="text-slate-500 dark:text-white/50 text-sm mb-8 italic">"Não deixe para amanhã o que pode ser feito hoje."</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setExitStep(2)} 
                    className="flex-1 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-white/70 font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Fazer depois
                  </button>
                  <button 
                    onClick={() => setShowExitModal(false)} 
                    className="flex-1 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    Continuar Estudo
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 mb-6 border-4 border-red-200 dark:border-red-500/30">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Sessão Interrompida</h3>
                
                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 mb-8 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-4">
                    <span className="text-slate-500 dark:text-white/60 text-sm">Faltavam apenas:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{remainingCards} cards</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500 dark:text-white/60 text-sm">Penalidade:</span>
                    <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      -{focusPointsLost} Foco
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/dashboard')} 
                  className="w-full px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/70 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Voltar ao Painel Principal
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}