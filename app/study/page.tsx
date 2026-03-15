import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import UserDropdown from "@/components/UserDropdown";

export default async function StudyPage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  } 

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Área de Estudos</h1>
            <p className="mt-2 text-sm text-white/60">
              Bem-vinda à Flux Idiomas.
            </p>
          </div>

          <UserDropdown email={user.email ?? 'Usuário'} />
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">Você está autenticado.</p>
          <p className="mt-2 text-white/50">Usuário: {user.email}</p>
        </section>
      </div>
    </main>
  );
}