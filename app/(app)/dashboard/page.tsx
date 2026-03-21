import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Buscamos o progresso real do usuário no banco
  let profile = { xp: 0, level: 1, daily_streak: 0 };
  const { data } = await supabase
    .from('profiles')
    .select('xp, level, daily_streak')
    .eq('id', user.id)
    .single();

  if (data) profile = data;

  // 2. Mocks Temporários
  const dailyGoalProgress = 65; 
  const accuracyRate = 88; 

  // Cálculo SVG
  const circleRadius = 36;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (dailyGoalProgress / 100) * circleCircumference;

  return (
    <section className="mb-12 pt-14 lg:pt-0">
      
      {/* CABEÇALHO */}
      <div className="mb-8 ml-2">
        <h2 className="text-3xl font-bold text-white">
          Bem-vindo de volta ao <span className="text-blue-500">Fluxo</span> 🌊
        </h2>
        <p className="mt-2 text-white/50">Veja seu progresso diário e continue aprendendo.</p>
      </div>

      {/* WIDGETS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-2">
        
        {/* WIDGET 1: A Onda */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/40 to-slate-900 p-6 shadow-lg">
          <svg className="absolute -right-4 -bottom-4 h-32 w-32 text-blue-500/10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 12C2 12 5 9 12 9C19 9 22 12 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M2 17C2 17 5 14 12 14C19 14 22 17 22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <h3 className="text-sm font-semibold text-white/70">Dias no Fluxo</h3>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-black text-white">{profile.daily_streak}</span>
            <span className="mb-1 text-lg font-medium text-blue-400">dias</span>
          </div>
          <p className="mt-2 text-xs text-white/50">
            {profile.daily_streak === 0 ? "Estude hoje para iniciar sua onda!" : "Continue surfando no aprendizado!"}
          </p>
        </div>

        {/* WIDGET 2: Meta Diária */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white/70">Meta Diária</h3>
            <p className="mt-1 text-2xl font-bold text-white">13 <span className="text-sm font-normal text-white/40">/ 20 cards</span></p>
            <p className="mt-4 text-xs font-medium text-emerald-400">Faltam só 7!</p>
          </div>
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={circleRadius} className="stroke-white/10" strokeWidth="8" fill="none" />
              <circle 
                cx="50" cy="50" r={circleRadius} 
                className="stroke-blue-500 transition-all duration-1000 ease-out" 
                strokeWidth="8" fill="none" strokeLinecap="round"
                style={{ strokeDasharray: circleCircumference, strokeDashoffset: strokeDashoffset }}
              />
            </svg>
            <span className="absolute text-sm font-bold text-white">{dailyGoalProgress}%</span>
          </div>
        </div>

        {/* WIDGET 3: Taxa de Acerto */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white/70">Taxa de Acerto</h3>
          </div>
          <div className="mt-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{accuracyRate}%</span>
              <span className="mb-1 text-xs text-emerald-400">Ótima memória!</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${accuracyRate}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ATALHO RÁPIDO: Continuar de onde parou */}
      <div className="mt-8 mx-2 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-between transition-colors hover:bg-blue-500/10">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="font-semibold text-white">Continuar aprendendo</h4>
            <p className="text-sm text-white/50">Deck: Inglês para Viagens</p>
          </div>
        </div>
        <Link href="/study" className="px-5 py-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
          Estudar Novo
        </Link>
      </div>

      {/* ÁREA DE ENGAJAMENTO INFERIOR (Revisões e Missões) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-2 mt-6">
        
        {/* 1. ALERTA DE REVISÕES (Urgência) */}
        <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Efeito de brilho no fundo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-3 w-3 rounded-full bg-orange-500 animate-pulse"></span>
              <h3 className="text-lg font-bold text-white">Revisões Pendentes</h3>
            </div>
            <p className="text-sm text-white/60 mb-6">
              Você tem <strong className="text-orange-400">14 flashcards</strong> aguardando revisão. Refresque sua memória antes que a curva de esquecimento atue!
            </p>
          </div>
          
          <Link href="/revisions" className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-xl bg-orange-500/20 text-orange-400 font-bold hover:bg-orange-500/30 transition-colors border border-orange-500/30">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Revisar Agora
          </Link>
        </div>

        {/* 2. MISSÕES DIÁRIAS (Gamificação/XP) */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Missões Diárias</h3>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
              Ganhe XP
            </span>
          </div>

          <div className="space-y-3">
            {/* Missão Completa */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 opacity-50">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white line-through decoration-white/50">Faça login no Fluxo</p>
              </div>
              <span className="text-xs font-bold text-emerald-400">+10 XP</span>
            </div>

            {/* Missão Pendente 1 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <div className="h-6 w-6 shrink-0 rounded-full border-2 border-white/20"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Aprenda 10 novas palavras</p>
              </div>
              <span className="text-xs font-bold text-purple-400">+50 XP</span>
            </div>

            {/* Missão Pendente 2 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <div className="h-6 w-6 shrink-0 rounded-full border-2 border-white/20"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Acerte 5 cards seguidos</p>
              </div>
              <span className="text-xs font-bold text-purple-400">+30 XP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}