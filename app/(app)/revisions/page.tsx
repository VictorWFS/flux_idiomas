import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RevisionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // MOCK: Quantidade de cards que a data de next_review é <= hoje
  const pendingCardsCount = 14; 

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-4xl mx-auto">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="mb-8 ml-2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">
          Sessão de <span className="text-orange-500">Revisão</span> 🧠
        </h2>
        <p className="mt-2 text-white/50">
          A repetição espaçada é o segredo para a fluência. Não deixe sua curva de esquecimento cair!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-2">
        
        {/* CARD PRINCIPAL (CALL TO ACTION) */}
        <div className="md:col-span-2 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-900/40 to-slate-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          {/* Efeito de fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-6 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Seu treino diário está pronto</h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Você tem <strong className="text-orange-400 text-lg">{pendingCardsCount} flashcards</strong> que estão prestes a sumir da sua memória. Vamos resgatá-los agora mesmo.
            </p>

            <Link 
              href="/study/revisions" // 💡 Futura rota do player focado em revisões
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 text-lg font-bold text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/25 w-full sm:w-auto"
            >
              Começar Revisão
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>

        {/* COLUNA LATERAL (STATUS) */}
        <div className="space-y-6">
          {/* Status Hoje */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h4 className="text-sm font-semibold text-white/70 mb-4">Status de Hoje</h4>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-black text-orange-400">{pendingCardsCount}</span>
              <span className="mb-1 text-sm font-medium text-white/50">pendentes</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full w-[10%]" /> {/* Barra quase vazia indicando que falta fazer */}
            </div>
            <p className="mt-3 text-xs text-white/40 text-center">Progresso diário de revisão</p>
          </div>

          {/* Dica do Algoritmo */}
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 shadow-lg relative overflow-hidden">
            <svg className="absolute -right-4 -bottom-4 h-24 w-24 text-blue-500/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">i</span>
              <h4 className="text-sm font-bold text-white">Como funciona?</h4>
            </div>
            <p className="text-xs text-white/60 leading-relaxed relative z-10">
              O Fluxo usa inteligência artificial para prever o exato momento em que você vai esquecer uma palavra, e te faz revisá-la um dia antes. Confie no algoritmo!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}