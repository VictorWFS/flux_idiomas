import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClassDetailsPage({ params }: { params: { id: string } }) {
  // 💡 MOCK DATA: Simulando os dados que futuramente virão do Supabase baseados no 'params.id'
  const mockClassData = {
    date: "21/03/2026",
    theme: "Phrasal Verbs de Viagem",
    teacher: "Sarah Connor",
    feedback: {
      positive: "Sua pronúncia no 'TH' melhorou absurdamente! O vocabulário de aeroporto está na ponta da língua.",
      improvement: "Ainda estamos confundindo um pouco o 'make' com o 'do' em situações rápidas. Tente pausar um segundo antes de responder para o cérebro processar a regra que você já sabe.",
    },
    pdfs: [
      { id: 1, title: "Lista Definitiva de Phrasal Verbs - Viagem.pdf", size: "2.4 MB" },
      { id: 2, title: "Exercícios de Fixação.pdf", size: "1.1 MB" },
    ],
    videos: [
      { id: 1, title: "Como passar na imigração americana (Cena Real)", duration: "12 min" },
    ]
  };

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-4xl mx-auto">
      
      {/* NAVEGAÇÃO / VOLTAR */}
      <Link href="/materials" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 ml-2">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        Voltar para Materiais
      </Link>

      {/* CABEÇALHO DA AULA */}
      <div className="mb-10 ml-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-500/30 transition-colors">
            Aula Concluída
          </span>
          <span className="text-sm font-bold text-slate-500 dark:text-white/40 transition-colors">{mockClassData.date}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight transition-colors">
          {mockClassData.theme}
        </h2>
        <p className="text-slate-600 dark:text-white/60 font-medium flex items-center gap-2 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Professor(a): {mockClassData.teacher}
        </p>
      </div>

      <div className="space-y-6 mx-2">
        
        {/* SESSÃO 1: FEEDBACK DO PROFESSOR */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 sm:p-8 shadow-xl transition-colors">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 transition-colors"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg></span>
            Feedback da Aula
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* O que foi bem */}
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 p-5 transition-colors">
              <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                O que foi excelente
              </h4>
              <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed transition-colors">{mockClassData.feedback.positive}</p>
            </div>
            
            {/* O que melhorar */}
            <div className="rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 p-5 transition-colors">
              <h4 className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Foco para a próxima
              </h4>
              <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed transition-colors">{mockClassData.feedback.improvement}</p>
            </div>
          </div>
        </div>

        {/* SESSÃO 2 E 3: MATERIAIS DE APOIO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PDFs */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg transition-colors">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 transition-colors">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg></span>
              Materiais em PDF
            </h3>
            <div className="space-y-3">
              {mockClassData.pdfs.map(pdf => (
                <div key={pdf.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <svg className="h-8 w-8 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    <div className="truncate pr-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate transition-colors">{pdf.title}</p>
                      <p className="text-xs text-slate-500 dark:text-white/40 transition-colors">{pdf.size}</p>
                    </div>
                  </div>
                  <button className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Vídeos Recomendados */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg transition-colors">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 transition-colors">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
              Vídeos Extras
            </h3>
            <div className="space-y-3">
              {mockClassData.videos.map(video => (
                <div key={video.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-10 w-16 shrink-0 rounded-lg bg-indigo-200 dark:bg-indigo-900/50 flex items-center justify-center relative overflow-hidden transition-colors">
                      <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-indigo-500/40 transition-colors"></div>
                      <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400 relative z-10 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div className="truncate pr-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate transition-colors">{video.title}</p>
                      <p className="text-xs text-slate-500 dark:text-white/40 transition-colors">{video.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}