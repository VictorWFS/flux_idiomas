import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DeckCarousel from "@/components/DeckCarousel"; 

export const dynamic = "force-dynamic";

// 1. DECKS INICIANTES
const beginnerDecks = [
  { 
    id: "beg_01", 
    title: "Inglês para Viagens", 
    description: "Vocabulário essencial para aeroportos, check-in no hotel e pedir comida.", 
    cards: 45, 
    progress: 80, 
    // 💡 LINK NOVO E ESTÁVEL: Asa de avião voando sobre as nuvens
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "beg_02", 
    title: "Apresentações e Cumprimentos", 
    description: "Aprenda a se apresentar, falar sobre sua família e rotina com naturalidade.", 
    cards: 30, 
    progress: 100, 
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop" 
  },
  { 
    id: "beg_03", 
    title: "Rotina e Dia a Dia", 
    description: "Frases essenciais para descrever suas atividades, horários e compromissos.", 
    cards: 40, 
    progress: 20, 
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop" 
  },
];

// 2. DECKS INTERMEDIÁRIOS
const intermediateDecks = [
  { id: "int_01", title: "Phrasal Verbs Essenciais", description: "Domine os 50 phrasal verbs mais usados no dia a dia por nativos.", cards: 50, progress: 30, imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop" },
  { id: "int_02", title: "Business English", description: "Termos e etiqueta corporativa para reuniões online e e-mails de negócios.", cards: 120, progress: 0, imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" },
  { id: "int_03", title: "Inglês para Entrevistas", description: "Prepare-se para entrevistas em inglês na área de TI e startups.", cards: 65, progress: 15, imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop" },
];

// 3. DECKS AVANÇADOS
const advancedDecks = [
  { id: "adv_01", title: "Expressões Idiomáticas (Slangs)", description: "Fale como um nativo dominando as gírias e expressões locais mais difíceis.", cards: 80, progress: 0, imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop" },
  { id: "adv_02", title: "Academic English", description: "Vocabulário denso para ler artigos científicos ou passar no TOEFL/IELTS.", cards: 200, progress: 0, imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop" },
  { id: "adv_03", title: "Notícias e Política", description: "Entenda jornais, podcasts complexos e debates econômicos em inglês.", cards: 110, progress: 0, imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop" },
];

export default async function StudyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    // 💡 Adicionado px-4 md:px-8 para criar margens laterais que dão espaço para as setas do carrossel
    <section className="mb-12 pt-14 lg:pt-0 max-w-7xl mx-auto px-4 md:px-8">
      
        <div className="mb-12">
        {/* 💡 text-slate-900 no modo claro, text-white no modo escuro */}
        <h2 className="text-4xl font-black text-slate-900 dark:text-white transition-colors duration-300">
          Meus <span className="text-blue-500">Decks</span> 📚
        </h2>
        <p className="mt-3 text-slate-600 dark:text-white/50 text-lg max-w-2xl leading-relaxed transition-colors duration-300">
          Sua estante pessoal de conhecimento. Selecione seu nível e surfe na onda da fluência.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* LINHA 1: INICIANTES */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">1</span>
            <h3 className="text-2xl font-black text-emerald-500 tracking-tight">Decks Iniciantes</h3>
          </div>
          <DeckCarousel decks={beginnerDecks} />
        </div>

        {/* LINHA 2: INTERMEDIÁRIOS */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 font-bold">2</span>
            <h3 className="text-2xl font-black text-orange-500 tracking-tight">Decks Intermediários</h3>
          </div>
          <DeckCarousel decks={intermediateDecks} />
        </div>

        {/* LINHA 3: AVANÇADOS */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-red-400 font-bold">3</span>
            <h3 className="text-2xl font-black text-red-500 tracking-tight">Decks Avançados</h3>
          </div>
          <DeckCarousel decks={advancedDecks} />
        </div>

      </div>

    </section>
  );
}