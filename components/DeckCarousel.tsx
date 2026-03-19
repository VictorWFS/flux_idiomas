"use client";

import { useRef } from "react";
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

export default function DeckCarousel({decks}: {decks: Deck[]}) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -260 : 260;

            carouselRef.current.scrollBy({left: scrollAmount, behavior: "smooth"})
        }
    };

    return (
      <div className="relative group w-full">
        {/* BOTÃO ESQUERDO (Aparece no hover do PC, some no Mobile) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white shadow-lg border border-white/20 hover:bg-black/50 hover:scale-110"
          aria-label="Rolar para esquerda"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* A "TRILHA" DO CARROSSEL 
        - flex, gap-5: Coloca os itens lado a lado com espaçamento.
        - overflow-x-auto: Cria a barra de rolagem horizontal.
        - snap-x snap-mandatory: Faz o card "encaixar" certinho na tela ao parar de rolar.
        - Ocultador de scrollbar: Usamos classes do Tailwind para esconder a barra visual feia.
      */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 px-2 
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/study/${deck.id}`}
              className="snap-start shrink-0 w-[220px] sm:w-[240px]"
            >
              <div className="group/card flex h-80 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-blue-500/50 hover:bg-white/10 cursor-pointer">
                <div>
                  <h3 className="text-xl font-semibold text-white transition-colors group-hover/card:text-blue-400 truncate">
                    {deck.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 line-clamp-4">
                    {deck.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
                    {deck.level}
                  </span>
                  <span className="text-sm font-medium text-white/40 transition-colors group-hover/card:text-white">
                    Estudar →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÃO DIREITO */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-lg border border-white/10 hover:bg-slate-800 hover:scale-110"
          aria-label="Rolar para direita"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
}
