"use client";

import { useRef, useState, useEffect } from "react";
import DeckCard from "./DeckCard";

interface Deck {
  id: string;
  title: string;
  description: string;
  cards: number;
  progress: number;
  imageUrl: string;
}

export default function DeckCarousel({ decks }: { decks: Deck[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);

  const checkForScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftBlur(scrollLeft > 10); // Ajustado para 10px de tolerância
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setShowRightBlur(!isAtEnd);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkForScrollPosition);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkForScrollPosition);
      }
    };
  }, [decks]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group overflow-visible">
      
      {/* 💡 TRANSPARENT BLUR ESQUERDO: Usando backdrop-blur */}
      <div 
        className={`absolute left-0 top-0 bottom-8 w-16 z-20 pointer-events-none transition-opacity duration-300 backdrop-blur-[6px] [mask-image:linear-gradient(to_right,white_20%,transparent)] ${
          showLeftBlur ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* 💡 TRANSPARENT BLUR DIREITO: Usando backdrop-blur */}
      <div 
        className={`absolute right-0 top-0 bottom-8 w-16 z-20 pointer-events-none transition-opacity duration-300 backdrop-blur-[6px] [mask-image:linear-gradient(to_left,white_20%,transparent)] ${
          showRightBlur ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* SETA ESQUERDA (Desktop - Z-30) */}
      <button 
        onClick={() => scroll("left")}
        className={`absolute -left-4 md:-left-6 top-1/2 z-30 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-2xl border border-white/20 transition-all hover:bg-blue-600 hover:scale-110 md:flex ${
          showLeftBlur ? "md:opacity-100" : "md:opacity-0 pointer-events-none"
        }`}
      >
        <svg className="h-6 w-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* CONTAINER DO CARROSSEL */}
      <div 
        ref={carouselRef}
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {decks.map((deck) => (
          // Largura mobile w-[78vw] para garantir o 'leak' visual
          <div key={deck.id} className="w-[78vw] md:w-[calc(33.333%-16px)] snap-center shrink-0 flex flex-col">
            <DeckCard deck={deck} />
          </div>
        ))}
        
        <div className="w-1 md:hidden shrink-0"></div>
      </div>

      {/* SETA DIREITA (Desktop - Z-30) */}
      <button 
        onClick={() => scroll("right")}
        className={`absolute -right-4 md:-right-6 top-1/2 z-30 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-2xl border border-white/20 transition-all hover:bg-blue-600 hover:scale-110 md:flex ${
          showRightBlur ? "md:opacity-100" : "md:opacity-0 pointer-events-none"
        }`}
      >
        <svg className="h-6 w-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}