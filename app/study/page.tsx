import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DeckCarousel from "@/components/DeckCarousel";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Deck {
  id: string;
  title: string;
  description: string;
  level: string;
  cover_image: string | null;
  is_published: boolean;
  created_at: string;
  category: string | null;
}

export default async function StudyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>; // Recebe o parâmetro da URL
}) {
  const supabase = await createClient();
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Montamos a query base do Supabase
  let query = supabase
    .from('decks')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  // Se o usuário clicou em uma categoria, adicionamos o filtro na busca do banco!
  if (currentCategory && currentCategory !== 'Todos') {
    query = query.eq('category', currentCategory);
  }

  const { data: decks, error } = await query;

  if (error) {
    console.error('Erro ao buscar decks:', error);
  }

  // Lista de categorias para o MVP (no futuro pode vir do banco)
  const categories = ['Todos', 'Viagens', 'Negócios', 'Dia a Dia'];


  return (
    <section className="mb-10 pt-14 lg:pt-0">
      <div className="pt-5 mb-8 ml-2 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => {
          // Descobre se este botão é o que está selecionado agora
          const isActive =
            currentCategory === cat || (!currentCategory && cat === "Todos");
          // Monta o link (Se for 'Todos', limpa a URL, senão, adiciona a categoria)
          const href = cat === "Todos" ? "/study" : `/study?category=${cat}`;

          return (
            <Link key={cat} href={href}>
              <span
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 2. TÍTULO DINÂMICO */}
      <div className="mb-6 ml-2">
        {currentCategory && currentCategory !== "Todos" ? (
          <h2 className="text-2xl font-bold text-white">
            Decks em <span className="text-blue-500">{currentCategory}</span>
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-white">Seus Decks</h2>
        )}
        <p className="mt-1 text-white/50">
          Escolha um módulo para estudar hoje.
        </p>
      </div>

      {/* 3. LISTA DE DECKS (Carrossel) */}
      {!decks || decks.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center mx-2">
          <p className="text-white/70">
            Nenhum deck encontrado nesta categoria.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <DeckCarousel decks={decks} />
        </div>
      )}
    </section>
  );
}