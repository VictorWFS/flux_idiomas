"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Flashcard, { SpokenWord } from "@/components/Flashcard";
import { Grade } from "@/lib/srs"; 

const mockCards = [
  { id: 1, front: "The book is on the table", back: "O livro está sobre a mesa" },
  { id: 2, front: "I would like a cup of coffee", back: "Eu gostaria de uma xícara de café" },
  { id: 3, front: "How much does it cost?", back: "Quanto isso custa?" },
];

export default function StudySessionPage() {
  const params = useParams();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasViewedBack, setHasViewedBack] = useState(false); // 💡 Novo estado: Lembra se a carta já foi virada
  const [isFinished, setIsFinished] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [spokenFeedback, setSpokenFeedback] = useState<SpokenWord[] | null>(null);

  const currentCard = mockCards[currentIndex];
  const progressPercentage = ((currentIndex) / mockCards.length) * 100;

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
      const feedback = words.map(w => ({
        word: w,
        correct: Math.random() > 0.25 
      }));
      setSpokenFeedback(feedback);
    }, 2000);
  };

  // 💡 Lógica do Flip Infinito
  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setHasViewedBack(true); // Se ele virou para ver a resposta, marcamos que ele já viu
    }
  };

  const handleAnswer = (grade: Grade) => {
    if (currentIndex < mockCards.length - 1) {
      setIsFlipped(false); 
      setHasViewedBack(false); // Reseta para a próxima carta
      setSpokenFeedback(null); 
      
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150); 
    } else {
      setIsFinished(true); 
    }
  };

  if (isFinished) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500 relative overflow-hidden">
        {/* Luzes de comemoração ao fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -z-10" />
        
        <h2 className="text-4xl font-black text-white mb-2">Sessão Concluída! 🎉</h2>
        <p className="text-white/50 mb-8 max-w-sm">Os cards que você teve dificuldade já foram separados para amanhã.</p>
        <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-500 transition-colors">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] flex-col w-full max-w-4xl mx-auto pt-6 lg:pt-0 relative">
      
      {/* 💡 AMBIENT LIGHTS (Luzes de fundo dinâmicas para tirar a cara monocromática) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 opacity-20 ${isFlipped ? 'bg-indigo-600' : 'bg-blue-600'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 opacity-20 ${isFlipped ? 'bg-purple-600' : 'bg-emerald-600'}`} />
      </div>

<div className="flex items-center gap-3 sm:gap-4 mb-10 px-4 w-full">
        
        {/* Botão Fechar */}
        <Link href="/dashboard" className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5 shrink-0">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </Link>
        
        {/* Container do Progresso e Contador */}
        <div className="flex-1 flex flex-col gap-1.5 mt-1">
          {/* 💡 AQUI ESTÁ O CONTADOR: Exibindo 3 / 15 */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider">Progresso</span>
            <span className="text-sm font-black text-white">
              {currentIndex + 1} <span className="text-white/40 font-medium">/ {mockCards.length}</span>
            </span>
          </div>
          
          {/* Barra de Progresso em Degradê Azul */}
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>
        
        {/* 🌊 O ÍCONE DA ONDA (FLUX) */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_4px_12px_rgba(59,130,246,0.15)] shrink-0"
          title="Dias no Fluxo"
        >
          <svg className="h-4 w-4 sm:h-4.5 sm:w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 12s2.5-3 5-3c2.5 0 2.5 3 5 3s2.5-3 5-3c2.5 0 5 3 5 3M2 17s2.5-3 5-3c2.5 0 2.5 3 5 3s2.5-3 5-3c2.5 0 5 3 5 3" />
          </svg>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">3</span>
        </div>
      </div>

      {/* 2. ÁREA CENTRAL (A Carta) */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full relative">
        <Flashcard 
          front={currentCard.front} 
          back={currentCard.back} 
          isFlipped={isFlipped}
          onFlip={handleToggleFlip} // 💡 Agora permite girar infinitamente
          isRecording={isRecording}
          onRecordStart={handleRecordStart}
          onPlayAudio={handlePlayAudio}
          spokenFeedback={spokenFeedback}
        />
      </div>

      {/* 3. CONTROLES DE AÇÃO */}
      <div className="h-32 mt-12 px-4 flex flex-col items-center justify-center w-full">
        
        {/* SE CARTA AINDA NÃO FOI VIRADA: Mostra a dica do microfone */}
        {!hasViewedBack && spokenFeedback && (
          <div className="animate-in fade-in slide-in-from-bottom-2 text-center">
            <p className="text-sm font-bold text-white/60 mb-3">
              Você pode <span className="text-emerald-400">Tentar de Novo</span> (no microfone) ou tocar na carta para ver a resposta.
            </p>
          </div>
        )}

        {/* SE A CARTA JÁ FOI VIRADA (Mesmo que o aluno vire de volta para a frente, os botões ficam!) */}
        {hasViewedBack && (
          <div className="w-full max-w-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
            <p className="text-center text-xs font-bold text-white/40 mb-3 uppercase tracking-wider">
              {isFlipped ? "Como foi o seu desempenho?" : "Avalie para ir ao próximo card"}
            </p>
            <div className="flex w-full gap-2 sm:gap-4">
              <button onClick={() => handleAnswer("muito_dificil")} className="flex-1 py-3 px-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-xs sm:text-sm font-bold shadow-[0_4px_14px_0_rgba(239,68,68,0.1)] hover:shadow-[0_4px_14px_0_rgba(239,68,68,0.2)]">
                Muito Difícil
              </button>
              <button onClick={() => handleAnswer("dificil")} className="flex-1 py-3 px-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-colors text-xs sm:text-sm font-bold shadow-[0_4px_14px_0_rgba(249,115,22,0.1)] hover:shadow-[0_4px_14px_0_rgba(249,115,22,0.2)]">
                Difícil
              </button>
              <button onClick={() => handleAnswer("mais_ou_menos")} className="flex-1 py-3 px-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs sm:text-sm font-bold shadow-[0_4px_14px_0_rgba(59,130,246,0.1)] hover:shadow-[0_4px_14px_0_rgba(59,130,246,0.2)]">
                Mais ou menos
              </button>
              <button onClick={() => handleAnswer("facil")} className="flex-1 py-3 px-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs sm:text-sm font-bold shadow-[0_4px_14px_0_rgba(16,185,129,0.1)] hover:shadow-[0_4px_14px_0_rgba(16,185,129,0.2)]">
                Fácil
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
} 