"use client";

import {useState} from 'react';

import Link from "next/link";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-4 top-4 z-40 rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/30 hover:text-white lg:hidden"
          aria-label="Abrir menu"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* OVERLAY ESCURO (Fundo)
        Cobre a tela quando o menu está aberto no mobile, permitindo fechar ao clicar fora
      */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* A SIDEBAR EM SI
        No Desktop (lg): Fica fixa na esquerda, estática.
        No Mobile: Fica escondida fora da tela e desliza (translate-x) quando abre.
      */}
        <aside
          className={`
        fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-slate-950 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          {/* Cabeçalho da Sidebar (Visível só no mobile para ter o botão de fechar) */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4 lg:hidden">
            <span className="font-semibold text-white">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-2 p-4 pt-8">
            <Link
              href="/study"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Meus Decks
            </Link>

            {/* Espaço para futuros links */}
            <Link
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Configurações
            </Link>
          </nav>
        </aside>
      </>
    );
}