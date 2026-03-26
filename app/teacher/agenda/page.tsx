"use client";

import { useState } from "react";

// Tipagem para nos ajudar a organizar os dados da aula
interface ClassData {
  id: number;
  date: string;
  time: string;
  student: string;
  theme: string;
  meetLink: string;
  status: "confirmed" | "late" | "canceled";
  studentNote?: string;
}

export default function TeacherAgendaPage() {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  // Mock dos dias da semana atual (Focando na semana do dia 26 de Março de 2026)
  const weekDays = [
    { dayName: "Dom", date: "22" },
    { dayName: "Seg", date: "23" },
    { dayName: "Ter", date: "24" }, 
    { dayName: "Qua", date: "25" },
    { dayName: "Qui", date: "26", isToday: true }, // Hoje!
    { dayName: "Sex", date: "27" },
    { dayName: "Sáb", date: "28" },
  ];

  // Mock de aulas marcadas, incluindo os status e recados
  const scheduledClasses: ClassData[] = [
    { 
      id: 1, date: "26", time: "14:00", student: "Ana Beatriz", theme: "Phrasal Verbs",
      meetLink: "https://meet.google.com/abc-defg-hij", status: "confirmed" 
    },
    { 
      id: 2, date: "26", time: "16:30", student: "Carlos Souza", theme: "Business English",
      meetLink: "https://meet.google.com/qwe-rtyu-iop", status: "late",
      studentNote: "Professor, vou atrasar uns 10 minutinhos porque tive um problema na internet do escritório!"
    },
    { 
      id: 3, date: "27", time: "10:00", student: "Mariana Silva", theme: "Conversação Livre",
      meetLink: "https://meet.google.com/zxc-vbnm-lkj", status: "canceled",
      studentNote: "Infelizmente peguei uma virose forte e não vou conseguir falar hoje. Podemos remarcar?"
    },
    { 
      id: 4, date: "24", time: "19:00", student: "João Pedro", theme: "Preparatório TOEFL",
      meetLink: "https://meet.google.com/tyu-ghjk-bnm", status: "confirmed" 
    },
  ];

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-7xl mx-auto">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 ml-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            Minha <span className="text-indigo-500">Agenda</span> 📅
          </h2>
          <p className="mt-2 text-slate-500 dark:text-white/50 transition-colors">
            Gerencie seus horários, acesse os links do Meet e veja recados dos alunos.
          </p>
        </div>

        {/* Toggle Semana / Mês */}
        <div className="flex bg-slate-200 dark:bg-white/5 p-1 rounded-xl w-full sm:w-auto transition-colors">
          <button 
            onClick={() => setViewMode("week")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${viewMode === "week" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
          >
            Semana
          </button>
          <button 
            onClick={() => setViewMode("month")}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${viewMode === "month" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
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
              const dayClasses = scheduledClasses.filter(c => c.date === day.date);

              return (
                <div 
                  key={day.date} 
                  className={`flex flex-col rounded-2xl border ${day.isToday ? 'border-indigo-300 dark:border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]'} p-3 min-h-[320px] transition-colors`}
                >
                  {/* Cabeçalho do Dia */}
                  <div className={`text-center pb-3 border-b ${day.isToday ? 'border-indigo-200 dark:border-indigo-500/30' : 'border-slate-200 dark:border-white/10'} mb-3`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${day.isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-white/50'}`}>
                      {day.dayName}
                    </p>
                    <p className={`text-2xl font-black ${day.isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                      {day.date}
                    </p>
                  </div>

                  {/* Lista de Aulas do Dia */}
                  <div className="flex-1 flex flex-col gap-3">
                    {dayClasses.length > 0 ? (
                      dayClasses.map(aula => (
                        <div 
                          key={aula.id} 
                          onClick={() => setSelectedClass(aula)} // 💡 AQUI: Clicar abre o Modal!
                          className={`group rounded-xl border p-3 shadow-sm transition-all cursor-pointer flex flex-col h-full
                            ${aula.status === 'canceled' ? 'border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5 hover:border-red-300 dark:hover:border-red-500/40 opacity-70' : 
                              aula.status === 'late' ? 'border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 hover:border-amber-300 dark:hover:border-amber-500/40' : 
                              'border-indigo-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-400'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              {aula.status === 'canceled' ? (
                                <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                              ) : aula.status === 'late' ? (
                                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                              ) : (
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                              )}
                              <p className={`text-xs font-bold uppercase tracking-tight ${aula.status === 'canceled' ? 'text-red-600 dark:text-red-400 line-through' : aula.status === 'late' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {aula.time}
                              </p>
                            </div>
                            {/* Ícone de aviso se tiver recado */}
                            {(aula.status === 'late' || aula.status === 'canceled') && (
                              <svg className={`h-4 w-4 ${aula.status === 'canceled' ? 'text-red-500' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            )}
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1 flex-1">
                            {aula.student}
                          </h4>
                          <p className="text-[10px] font-medium text-slate-500 dark:text-white/50 mb-3 truncate">
                            {aula.theme}
                          </p>
                        </div>
                      ))
                    ) : (
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
          // VISÃO MENSAL (Placeholder)
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
             <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-white/30">
               <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Visão Mensal em Construção</h4>
             <p className="text-slate-500 dark:text-white/50 max-w-sm">
               Em breve, uma visão panorâmica do seu mês.
             </p>
          </div>
        )}
      </div>

      {/* 💡 MODAL DE DETALHES DA AULA (Onde a mágica do Meet e do Recado acontece) */}
      {selectedClass && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 transition-colors"
          onClick={() => setSelectedClass(null)}
        >
          <div 
            className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 shadow-2xl relative transition-colors"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Botão Fechar */}
            <button 
              onClick={() => setSelectedClass(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Cabeçalho do Modal */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{selectedClass.student}</h3>
                  <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">Hoje, às {selectedClass.time}</p>
                </div>
              </div>
            </div>

            {/* Caixa de Recado do Aluno (Atraso / Falta) */}
            {selectedClass.studentNote && (
              <div className={`mb-6 p-4 rounded-2xl border ${selectedClass.status === 'canceled' ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${selectedClass.status === 'canceled' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {selectedClass.status === 'canceled' ? 'Aviso de Falta' : 'Aviso de Atraso'}
                </h4>
                <p className={`text-sm italic ${selectedClass.status === 'canceled' ? 'text-red-800 dark:text-red-200' : 'text-amber-800 dark:text-amber-200'}`}>
                  "{selectedClass.studentNote}"
                </p>
              </div>
            )}

            {/* Detalhes da Aula */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <svg className="h-5 w-5 text-slate-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <div>
                  <p className="text-xs text-slate-500 dark:text-white/40 font-medium">Tema programado</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedClass.theme}</p>
                </div>
              </div>
            </div>

            {/* Ação Principal: Google Meet */}
            <div className="flex flex-col gap-3">
              <a 
                href={selectedClass.meetLink} 
                target="_blank" 
                rel="noreferrer"
                className={`w-full rounded-xl py-3.5 text-center text-sm font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2
                  ${selectedClass.status === 'canceled' 
                    ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-50 shadow-none' 
                    : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'}`}
                onClick={(e) => selectedClass.status === 'canceled' && e.preventDefault()}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/></svg>
                {selectedClass.status === 'canceled' ? 'Aula Cancelada pelo Aluno' : 'Iniciar Aula no Meet'}
              </a>
              
              {/* Opção secundária (Copiar link) só aparece se a aula não for cancelada */}
              {selectedClass.status !== 'canceled' && (
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedClass.meetLink);
                    alert("Link do Meet copiado!");
                  }}
                  className="w-full rounded-xl bg-transparent border border-slate-200 dark:border-white/10 py-3 text-center text-sm font-bold text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copiar link da reunião
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}