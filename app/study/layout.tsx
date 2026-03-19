import { createClient } from "@/lib/supabase/client";
import UserDropdown from "@/components/UserDropdown";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StudyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    return (
      <div className="flex min-h-screen flex-col bg-slate-950 text-white">
        {/* HEADER LIMPO COM A LINHA DIVISÓRIA */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 px-4 sm:px-6 pb-1 pt-1">
          <Link href="/study">
            <Image
              src={"/images/flux-idiomas-logo.png"}
              width={100}
              height={30}
              priority
              className="scale-190 mt-4 ml-10"
              alt="Logo flux idiomas"
            />
          </Link>

          <UserDropdown email={user?.email ?? "Usuário"} />
        </header>

        {/* ÁREA INFERIOR: SIDEBAR + CONTEÚDO */}
        {/* Adicionamos 'relative' aqui para o botão hambúrguer se posicionar corretamente */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Componente Client-side que controla o menu */}
          <Sidebar />

          {/* ÁREA PRINCIPAL ONDE OS DECKS APARECEM */}
          <main className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="mx-auto max-w-6xl mt-4">{children}</div>
          </main>
        </div>
      </div>
    );
}


