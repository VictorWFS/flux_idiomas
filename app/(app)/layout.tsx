import { createClient } from "@/lib/supabase/server";
import UserDropdown from "@/components/UserDropdown";
import Sidebar from "@/components/Sidebar"; 
import Image from "next/image";
import Link from "next/link";
import LevelBadge from "@/components/LevelBadge";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = { xp: 0, level: 1 };
  
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('xp, level')
      .eq('id', user.id)
      .single();

    if (data) profile = data;
  }

  const xpForNextLevel = profile.level * 100;
  const progressPercentage = Math.min((profile.xp / xpForNextLevel) * 100, 100);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* 💡 HEADER SEMPRE ESCURO (Fixamos bg-slate-950 e text-white aqui) */}
      <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-4 sm:px-6 z-20 shrink-0">
        <Link href="/dashboard">
          <Image
            src={"/images/flux-idiomas-logo.png"}
            width={100}
            height={30}
            priority
            className="scale-190 mt-3 ml-2"
            alt="Logo flux idiomas"
          />
        </Link>

        {/* ÁREA DIREITA: Notificações + Status + Dropdown */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* A. SINO DE NOTIFICAÇÕES (Fixo escuro) */}
          <button className="relative p-2 text-white/50 transition-colors hover:text-white rounded-full hover:bg-white/5">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* O anel da bolinha volta a ser da cor do fundo escuro */}
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
          </button>

          {/* B. BARRA DE NÍVEL E XP */}
          <LevelBadge
            xp={profile.xp}
            level={profile.level}
            nextLevelXp={xpForNextLevel}
            progress={progressPercentage}
          />

          {/* C. DROPDOWN DO USUÁRIO */}
          <UserDropdown email={user?.email ?? "Usuário"} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="mx-auto max-w-6xl mt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}