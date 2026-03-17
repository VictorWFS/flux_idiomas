import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import UserDropdown from "@/components/UserDropdown";
import Image from "next/image";
import Link from "next/link";

interface Deck {
  id: string;
  title: string;
  description: string;
  level: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
}

export default async function StudyPage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  } 
  const { data: decks, error } = await supabase
    .from('decks')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar decks:', error);
  }


  return (
    <main className="min-h-screen bg-slate-950 p-2 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <Image 
                                src={"/images/flux-idiomas-logo.png"}
                                width = {100}
                                height={30}
                                priority 
                                className='scale-190 mt-3 ml-2'
                                alt="Logo flux idiomas"
                            />
          </div>
          <div>
          </div>

          <UserDropdown email={user.email ?? 'Usuário'} />
        </header>

<section className="mb-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white ml-2">Seus Decks</h2>
            <p className="mt-1 ml-2 text-white/50">Escolha um módulo para estudar hoje.</p>
          </div>

          {!decks || decks.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-white/70">Nenhum deck disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {decks.map((deck: Deck) => (
                <Link key={deck.id} href={`/study/${deck.id}`}>
                  <div className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-blue-500/50 hover:bg-white/10">
                    <div>
                      <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                        {deck.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/60 line-clamp-2">
                        {deck.description}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
                        {deck.level}
                      </span>
                      <span className="text-sm font-medium text-white/40 transition-colors group-hover:text-white">
                        Estudar →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}