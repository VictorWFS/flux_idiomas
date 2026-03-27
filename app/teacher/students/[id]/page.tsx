"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id;
  const [activeTab, setActiveTab] = useState<"overview" | "decks" | "history">("overview");

  // 💡 MOCK DATA
  const student = {
    name: "Ana Beatriz",
    email: "ana.beatriz@email.com",
    level: 12,
    xp: 2450,
    joinDate: "Janeiro de 2026",
    status: "active",
    streak: 15,
    accuracy: "88%",
    cardsReviewed: 1240,
    nextClass: { date: "Hoje, 26 Mar", time: "15:30", theme: "Phrasal Verbs" }
  };

  const studentDecks = [
    { id: 1, title: "Business English", mastery: 92, lastStudied: "Hoje" },
    { id: 2, title: "Phrasal Verbs", mastery: 45, lastStudied: "Ontem" },
    { id: 3, title: "Irregular Verbs", mastery: 100, lastStudied: "Há 3 dias" },
    { id: 4, title: "False Friends", mastery: 68, lastStudied: "Semana passada" },
  ];

  // Cálculo para o círculo de progresso (SVG)
  const circleRadius = 36;
  const circleCircumference = 2 * Math.PI * circleRadius;

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-5xl mx-auto">
      
      {/* BOTÃO VOLTAR */}
      <div className="mb-6 ml-2">
        <Link 
          href="/teacher/students" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-white/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar para Lista de Alunos
        </Link>
      </div>

      {/* CABEÇALHO DO PERFIL */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 md:p-8 shadow-xl transition-colors mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-black text-3xl border-4 border-white dark:border-slate-800 shadow-lg relative z-10 transition-colors">
          {student.name.charAt(0)}
          <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 shadow-sm"></div>
        </div>

        <div className="flex-1 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight transition-colors">{student.name}</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-white/50 transition-colors">{student.email} • Aluna desde {student.joinDate}</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-500/20 transition-colors">
                Nível {student.level}
              </span>
              <p className="text-xs font-medium text-slate-400 dark:text-white/40 mt-1 transition-colors">{student.xp} XP acumulados</p>
            </div>
          </div>
        </div>
      </div>

      {/* NAVEGAÇÃO INTERNA (TABS) */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-white/10 mb-8 pb-px no-scrollbar ml-2 transition-colors">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "overview" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab("decks")}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "decks" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          Desempenho nos Decks
        </button>
      </div>

      {/* CONTEÚDO DAS TABS */}
{/* CONTEÚDO DAS TABS */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-2">
            
            {/* 💡 WIDGET ATUALIZADO: Fluxo Atual com ícone de Onda */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm transition-colors flex flex-col items-center justify-center text-center">
              <svg className="h-8 w-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
              </svg>
              <p className="text-xs text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider transition-colors">Fluxo Atual</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{student.streak} dias</p>
            </div>

            {/* Taxa de Acertos */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm transition-colors flex flex-col items-center justify-center text-center">
              <svg className="h-8 w-8 text-emerald-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-xs text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider transition-colors">Taxa de Acertos</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{student.accuracy}</p>
            </div>

            {/* Cards Revisados */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm transition-colors flex flex-col items-center justify-center text-center">
              <svg className="h-8 w-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <p className="text-xs text-slate-500 dark:text-white/50 font-bold uppercase tracking-wider transition-colors">Cards Revisados</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{student.cardsReviewed}</p>
            </div>
          </div>

          <div className="mx-2 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5 p-6 shadow-sm transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Próximo Encontro</p>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{student.nextClass.date} às {student.nextClass.time}</h4>
                <p className="text-sm text-slate-600 dark:text-white/60 transition-colors">Tema: {student.nextClass.theme}</p>
              </div>
            </div>
            <Link href="/teacher/agenda" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shadow-md text-center">
              Ver na Agenda
            </Link>
          </div>
        </div>
      )}

      {activeTab === "decks" && (
        <div className="mx-2 space-y-6 animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Domínio por Material
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-white/50">{studentDecks.length} materiais atribuídos</span>
          </div>

          {/* GRID DE WIDGETS CIRCULARES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentDecks.map((deck) => {
              // Lógica de Cores Baseada na Porcentagem
              const isDanger = deck.mastery < 50;
              const isWarning = deck.mastery >= 50 && deck.mastery < 80;
              const colorClass = isDanger ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-emerald-500';
              const bgColorClass = isDanger ? 'bg-red-50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20' : 
                                   isWarning ? 'bg-amber-50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20' : 
                                   'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20';
              
              // Cálculo do preenchimento da borda do SVG
              const strokeDashoffset = circleCircumference - (deck.mastery / 100) * circleCircumference;

              return (
                <div key={deck.id} className={`rounded-3xl border p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all ${bgColorClass}`}>
                  
                  {/* Gráfico Circular (SVG) */}
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    <svg className="transform -rotate-90 w-24 h-24">
                      {/* Círculo de Fundo (Trilha) */}
                      <circle 
                        cx="48" cy="48" r={circleRadius} 
                        stroke="currentColor" strokeWidth="8" fill="transparent" 
                        className="text-slate-200 dark:text-white/10" 
                      />
                      {/* Círculo de Progresso (Colorido) */}
                      <circle 
                        cx="48" cy="48" r={circleRadius} 
                        stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={circleCircumference} 
                        strokeDashoffset={strokeDashoffset} 
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ease-out ${colorClass}`} 
                      />
                    </svg>
                    
                    {/* Texto no meio do círculo */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-xl font-black ${colorClass}`}>{deck.mastery}%</span>
                    </div>
                  </div>

                  {/* Informações do Material */}
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-2 leading-tight min-h-[40px] flex items-center justify-center">
                    {deck.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 dark:text-white/50 uppercase tracking-wider">
                    Visto: {deck.lastStudied}
                  </p>
                </div>
              );
            })}
          </div>

          <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400 font-bold transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Atribuir Novo Deck para {student.name.split(' ')[0]}
          </button>
        </div>
      )}

    </section>
  );
}