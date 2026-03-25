import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";
import TeacherSidebar from "@/components/TeacherSidebar"; 
import Image from "next/image";
import Link from "next/link";
import LevelBadge from "@/components/LevelBadge";

export const dynamic = "force-dynamic";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Verifica segurança extra: se não for professor ou admin, chuta de volta pro dashboard de aluno
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, xp')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // O professor continua ganhando XP, mas exibiremos um crachá de "Professor"
  const xp = profile?.xp || 0;
  const xpForNextLevel = 1000; // Simulação genérica
  const progressPercentage = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* HEADER ESCURO (Padrão da plataforma) */}
      <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-4 sm:px-6 z-20 shrink-0">
        <Link href="/teacher">
          <Image
            src={"/images/flux-idiomas-logo.png"}
            width={100}
            height={30}
            priority
            className="scale-190 mt-3 ml-2"
            alt="Logo flux idiomas"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Badge Exclusivo de Professor */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Professor
          </div>

          <LevelBadge
            xp={xp}
            level={99} // Level estético alto para professores
            nextLevelXp={xpForNextLevel}
            progress={progressPercentage}
          />

          <UserDropdown email={user.email ?? "Professor"} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <TeacherSidebar />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="mx-auto max-w-6xl mt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}