import Link from "next/link";

export const dynamic = "force-dynamic";

export default function TeacherDashboardPage() {
  // 💡 MOCK DATA: Simulando os dados do backend
  const nextClass = {
    student: "Ana Beatriz",
    time: "15:30",
    theme: "Preparatório TOEFL - Speaking",
    platform: "Google Meet",
  };

  const classStats = {
    averageScore: "88%",
    activeStudents: "14/15",
    averageStreak: "5 dias",
  };

  const pendingAlerts = [
    { id: 1, type: "feedback", title: "Feedback Pendente", desc: "Aula com Carlos Souza (Ontem)", color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: 2, type: "warning", title: "Risco de Inatividade", desc: "Mariana não revisa há 4 dias", color: "text-red-500", bg: "bg-red-500/10" },
    { id: 3, type: "insight", title: "Dificuldade Coletiva", desc: "O deck 'Phrasal Verbs' tem 45% de erro", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-6xl mx-auto">
      
      {/* CABEÇALHO */}
      <div className="mb-8 ml-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
          Visão Geral da <span className="text-indigo-500">Turma</span> 📊
        </h2>
        <p className="mt-2 text-slate-500 dark:text-white/50 transition-colors">
          Acompanhe o desempenho dos seus alunos e prepare-se para suas próximas aulas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-2">
        
        {/* WIDGET 1: Próxima Aula (Destaque Principal) */}
        <div className="lg:col-span-2 rounded-3xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-transparent dark:bg-gradient-to-br dark:from-indigo-900/30 dark:to-slate-900 p-8 flex flex-col justify-center relative overflow-hidden shadow-xl transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider transition-colors">Sua Próxima Aula</span>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 transition-colors">
                {nextClass.time} <span className="text-slate-400 dark:text-white/30 font-medium text-xl">— {nextClass.student}</span>
              </h3>
              <p className="text-slate-600 dark:text-white/70 font-medium flex items-center gap-2 mb-1 transition-colors">
                <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                {nextClass.theme}
              </p>
              <p className="text-sm text-slate-500 dark:text-white/50 flex items-center gap-2 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                {nextClass.platform}
              </p>
            </div>
            
            <button className="w-full md:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 shrink-0">
              Entrar na Sala
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>

        {/* WIDGET 2: Alertas e Pendências */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-xl transition-colors flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
            <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Prioridades
          </h3>
          
          <div className="flex-1 space-y-3">
            {pendingAlerts.map(alert => (
              <div key={alert.id} className="flex gap-3 p-3 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${alert.bg} ${alert.color}`}>
                  {alert.type === 'feedback' && <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
                  {alert.type === 'warning' && <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                  {alert.type === 'insight' && <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{alert.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-white/50 transition-colors">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* WIDGET 3: Termômetro da Turma (Métricas) */}
      <div className="mt-6 mx-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm transition-colors flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-white/50 font-medium transition-colors">Taxa de Acertos</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{classStats.averageScore}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm transition-colors flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-white/50 font-medium transition-colors">Alunos Ativos</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{classStats.activeStudents}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm transition-colors flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-white/50 font-medium transition-colors">Ofensiva Média</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{classStats.averageStreak}</p>
          </div>
        </div>

      </div>
    </section>
  );
}