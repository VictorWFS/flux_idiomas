"use client";

import { useState } from "react";

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState<"decks" | "files">("decks");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 💡 NOVO ESTADO: Controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 💡 MOCK DATA: Decks de Flashcards
  const mockDecks = [
    { id: 1, title: "Business English Vocabulary", cards: 45, level: "B2-C1", lastEdited: "Ontem", color: "bg-indigo-500" },
    { id: 2, title: "Phrasal Verbs Essenciais", cards: 120, level: "B1-B2", lastEdited: "Há 3 dias", color: "bg-emerald-500" },
    { id: 3, title: "Irregular Verbs (Past Simple)", cards: 60, level: "A2", lastEdited: "Semana passada", color: "bg-amber-500" },
    { id: 4, title: "False Friends (PT-EN)", cards: 30, level: "B2", lastEdited: "Há 2 semanas", color: "bg-red-500" },
  ];

  // 💡 MOCK DATA: Arquivos e Vídeos
  const mockFiles = [
    { id: 1, title: "Guia de Pronúncia - TH.pdf", type: "pdf", size: "2.4 MB", date: "20 Mar 2026" },
    { id: 2, title: "Apresentação TedTalk - Liderança", type: "video", size: "Link", date: "15 Mar 2026" },
    { id: 3, title: "Exercícios de Fixação - Present Perfect.pdf", type: "pdf", size: "1.1 MB", date: "10 Mar 2026" },
  ];

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-7xl mx-auto">
      
      {/* CABEÇALHO E AÇÕES PRINCIPAIS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 ml-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            Meus <span className="text-indigo-500">Materiais</span> 📚
          </h2>
          <p className="mt-2 text-slate-500 dark:text-white/50 transition-colors">
            Crie decks de flashcards, adicione PDFs e organize sua biblioteca de ensino.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Barra de Pesquisa */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Buscar material..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors shadow-sm"
            />
          </div>
          
          {/* 💡 AQUI: Botão Novo Material abre o Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25 whitespace-nowrap"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Novo Material
          </button>
        </div>
      </div>

      {/* NAVEGAÇÃO EM ABAS */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-white/10 mb-8 pb-px no-scrollbar ml-2 transition-colors">
        <button 
          onClick={() => setActiveTab("decks")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === "decks" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Decks de Flashcards
        </button>
        <button 
          onClick={() => setActiveTab("files")}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === "files" ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Arquivos & Vídeos
        </button>
      </div>

      {/* ABA: DECKS DE FLASHCARDS */}
      {activeTab === "decks" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-2 animate-in fade-in duration-300">
          {mockDecks.map(deck => (
            <div key={deck.id} className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all flex flex-col h-full relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1.5 ${deck.color}`}></div>

              <div className="flex justify-between items-start mb-4 mt-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 text-xs font-bold uppercase tracking-wider transition-colors">
                  {deck.level}
                </span>
                <button className="text-slate-400 hover:text-slate-900 dark:text-white/40 dark:hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight flex-1 transition-colors">
                {deck.title}
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/50 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span className="font-bold text-slate-700 dark:text-white/80">{deck.cards}</span> cards
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40 transition-colors">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {deck.lastEdited}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button className="flex-1 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors border border-indigo-100 dark:border-indigo-500/20">
                  Editar Deck
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-colors" title="Atribuir a Aluno">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ABA: ARQUIVOS & VÍDEOS */}
      {activeTab === "files" && (
        <div className="mx-2 animate-in fade-in duration-300">
          <div className="mb-8 rounded-3xl border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-900/10 p-10 text-center transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Clique ou arraste arquivos aqui</h3>
            <p className="text-sm text-slate-500 dark:text-white/50 max-w-sm mx-auto">
              Faça upload de PDFs (máx 10MB) ou adicione links do YouTube para compartilhar com seus alunos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm transition-colors">
            {mockFiles.map((file, index) => (
              <div key={file.id} className={`flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${index !== mockFiles.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${file.type === 'pdf' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500'}`}>
                    {file.type === 'pdf' ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    ) : (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{file.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">{file.date} • {file.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💡 MODAL: O que deseja adicionar? */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 transition-colors"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-2xl relative transition-colors"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Botão Fechar */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 text-center transition-colors">Novo Material</h3>
            <p className="text-sm text-slate-500 dark:text-white/50 text-center mb-6 transition-colors">O que você deseja criar ou adicionar hoje?</p>

            <div className="space-y-3">
              {/* Opção 1: Deck de Flashcards */}
              <button 
                onClick={() => {
                  alert("Em breve: Direcionar para a tela de criar um novo deck!");
                  setIsModalOpen(false);
                }}
                className="w-full group rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 flex items-center gap-4 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Deck de Flashcards</h4>
                  <p className="text-xs text-slate-500 dark:text-white/50 transition-colors">Crie um novo conjunto de cards para revisão.</p>
                </div>
              </button>

              {/* Opção 2: Arquivo ou Vídeo */}
              <button 
                onClick={() => {
                  setActiveTab("files"); // Já leva direto pra aba de arquivos
                  setIsModalOpen(false);
                }}
                className="w-full group rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 flex items-center gap-4 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Arquivo ou Vídeo</h4>
                  <p className="text-xs text-slate-500 dark:text-white/50 transition-colors">Faça upload de PDFs ou links do YouTube.</p>
                </div>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}