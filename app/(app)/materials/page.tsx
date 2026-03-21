import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TeacherDecksList from "@/components/TeacherDeckList";

export const dynamic = "force-dynamic";

// DADOS SIMULADOS (Mock Data)
const mockAulas = [
  { id: 1, date: "21/03/2026", theme: "Phrasal Verbs de Viagem", isNew: true },
  { id: 2, date: "18/03/2026", theme: "Present Perfect vs Past Simple", isNew: false },
  { id: 3, date: "14/03/2026", theme: "Vocabulário de Aeroporto", isNew: false },
  { id: 4, date: "10/03/2026", theme: "Introdução ao Business English", isNew: false },
];

const mockDecks = [
  { id: 101, title: "Prática: Phrasal Verbs", classDate: "21/03/2026", cards: 15, xp: 150, isNew: true },
  { id: 102, title: "Revisão: Present Perfect", classDate: "18/03/2026", cards: 20, xp: 200, isNew: false },
];

export default async function MaterialsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <section className="mb-12 pt-14 lg:pt-0">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="mb-8 ml-2">
        <h2 className="text-3xl font-bold text-white">
          Material de <span className="text-blue-500">Aula</span> 📚
        </h2>
        <p className="mt-2 text-white/50">
          Aceda aos resumos e decks personalizados enviados pelo seu professor.
        </p>
      </div>

      {/* GRID DOS WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-2">
        
        {/* WIDGET 1: Aulas Anteriores (Continua igual, é estático por enquanto) */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white border border-white/20">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white">Aulas Anteriores</h3>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            {mockAulas.map((aula) => (
              <div key={aula.id} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10 cursor-pointer">
                <div className="flex h-3 w-3 shrink-0 items-center justify-center">
                  {aula.isNew ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${aula.isNew ? 'font-bold text-white' : 'font-medium text-white/70'}`}>
                    <span className={aula.isNew ? 'text-blue-400' : 'text-white/40'}>{aula.date}</span> — {aula.theme}
                  </p>
                </div>
                <svg className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET 2: Decks Novos */}
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-slate-900 p-6 flex flex-col h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Decks Novos</h3>
              <p className="text-xs text-blue-400">Atividades do professor</p>
            </div>
          </div>

          {/* 💡 2. Substituímos a lista estática pelo nosso novo componente interativo */}
          <TeacherDecksList decks={mockDecks} />

        </div>

      </div>
    </section>
  );
}