"use client";

import { useState } from "react";

interface LevelBadgeProps {
  xp: number;
  level: number;
  nextLevelXp: number;
  progress: number;
}

export default function LevelBadge({ xp, level, nextLevelXp, progress }: LevelBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Valores mockados para o MVP Visual. No futuro, virão do Supabase!
  const skills = [
    { name: "Disciplina", value: 85, color: "bg-emerald-500", desc: "Consistência e metas diárias" },
    { name: "Vocabulário", value: 60, color: "bg-blue-500", desc: "Palavras novas aprendidas" },
    { name: "Memória", value: 75, color: "bg-purple-500", desc: "Taxa de acerto nas revisões" },
    { name: "Foco", value: 40, color: "bg-orange-500", desc: "Sessões concluídas sem interrupção" },
  ];

  return (
    <>
      {/* 1. O BOTÃO NO HEADER (A Barra de Nível) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex flex-col items-end justify-center mt-1 cursor-pointer group transition-transform hover:scale-105"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">
            XP: {xp}/{nextLevelXp}
          </span>
          <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            Lvl {level}
          </span>
        </div>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 2. O MODAL DE HABILIDADES */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)} // Fecha se clicar fora
        >
          {/* Caixa do Modal */}
          <div 
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()} // Impede que clique dentro feche o modal
          >
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <span className="text-xl font-black text-blue-400">{level}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Status do Aluno</h3>
                  <p className="text-sm text-white/50">{xp} / {nextLevelXp} XP para o Nível {level + 1}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Lista de Habilidades */}
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-end mb-1">
                    <div>
                      <span className="text-sm font-bold text-white block">{skill.name}</span>
                      <span className="text-xs text-white/40">{skill.desc}</span>
                    </div>
                    <span className="text-xs font-bold text-white/70">{skill.value}/100</span>
                  </div>
                  {/* Barra da Habilidade */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div 
                      className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dica do Jogo */}
            <div className="mt-6 rounded-xl bg-blue-500/10 p-3 border border-blue-500/20 text-center">
              <p className="text-xs text-blue-300">
                ⚠️ Cuidado! Suas habilidades diminuem se você parar de praticar. Mantenha o fluxo!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}