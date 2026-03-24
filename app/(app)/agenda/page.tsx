"use client";

import { useState } from "react";

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  // Mock dos dias da semana atual (Exemplo: 22 a 28 de Março)
  const weekDays = [
    { dayName: "Dom", date: "22" },
    { dayName: "Seg", date: "23" },
    { dayName: "Ter", date: "24", isToday: true }, // Simulando que hoje é dia 24
    { dayName: "Qua", date: "25" },
    { dayName: "Qui", date: "26" },
    { dayName: "Sex", date: "27" },
    { dayName: "Sáb", date: "28" },
  ];

  // Mock de aulas marcadas com base no "date"
  const scheduledClasses = [
    { id: 1, date: "24", time: "19:00", title: "Inglês para Negócios", teacher: "Teacher Sarah" },
    { id: 2, date: "26", time: "19:00", title: "Conversação Livre", teacher: "Teacher Mike" },
    { id: 3, date: "26", time: "20:30", title: "Tira-Dúvidas", teacher: "Plantão" },
  ];

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-7xl mx-auto">
      
      {/* CABEÇALHO COM TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 ml-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            Agenda de <span className="text-blue-500">Aulas</span> 📅
          </h2>
          <p className="mt-2 text-slate-500 dark:text-white/50 transition-colors">
            Acompanhe seus encontros ao vivo com os professores da Flux.
          </p>
        </div>

        {/* Toggle Semana / Mês */}
        <div className="flex bg-slate-200 dark:bg-white/5 p-1 rounded-xl w-full sm:w-auto transition-colors">
          <button 
            onClick={() => setViewMode("week")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${viewMode === "week" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
          >
            Semana
          </button>
          <button 
            onClick={() => setViewMode("month")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${viewMode === "month" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
          >
            Mês
          </button>
        </div>
      </div>

      {/* ÁREA DO CALENDÁRIO */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 p-6 shadow-xl transition-colors min-h-[500px]">
        
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Março de 2026</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/70 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="p-2 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/70 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {viewMode === "week" ? (
          // VISUALIZAÇÃO POR SEMANA (GRADE DE 7 DIAS)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {weekDays.map(day => {
              // Filtra as aulas do dia específico
              const dayClasses = scheduledClasses.filter(c => c.date === day.date);

              return (
                <div 
                  key={day.date} 
                  className={`flex flex-col rounded-2xl border ${day.isToday ? 'border-blue-300 dark:border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]'} p-3 min-h-[320px] transition-colors`}
                >
                  {/* Cabeçalho do Dia */}
                  <div className={`text-center pb-3 border-b ${day.isToday ? 'border-blue-200 dark:border-blue-500/30' : 'border-slate-200 dark:border-white/10'} mb-3`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${day.isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-white/50'}`}>
                      {day.dayName}
                    </p>
                    <p className={`text-2xl font-black ${day.isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                      {day.date}
                    </p>
                  </div>

                  {/* Lista de Aulas do Dia */}
                  <div className="flex-1 flex flex-col gap-3">
                    {dayClasses.length > 0 ? (
                      dayClasses.map(aula => (
                        <div key={aula.id} className="group rounded-xl border border-blue-200 dark:border-blue-500/20 bg-white dark:bg-blue-500/10 p-3 shadow-sm hover:border-blue-400 dark:hover:border-blue-400 transition-all cursor-pointer flex flex-col h-full">
                          
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                              {aula.time}
                            </p>
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1 flex-1">
                            {aula.title}
                          </h4>
                          <p className="text-[10px] font-medium text-slate-500 dark:text-white/50 mb-3 truncate">
                            {aula.teacher}
                          </p>
                          
                          <button className="w-full text-xs font-bold bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center gap-1 mt-auto">
                            Acessar
                            <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      // Estado Vazio (Livre)
                      <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                        <svg className="h-6 w-6 text-slate-400 dark:text-white/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                        <p className="text-xs font-medium text-slate-500 dark:text-white/50">Livre</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // VISUALIZAÇÃO POR MÊS (Placeholder Premium)
          <div className="flex flex-col items-center justify-center h-[400px] text-center animate-in fade-in duration-300">
             <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-white/30 transition-colors">
               <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Visão Mensal em Construção</h4>
             <p className="text-slate-500 dark:text-white/50 max-w-sm transition-colors">
               O calendário completo com a grade visual do mês chegará nas próximas atualizações. Por enquanto, acompanhe suas aulas pela aba "Semana".
             </p>
          </div>
        )}
      </div>
    </section>
  );
}