"use client";

import { useState } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TeacherSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
      <>
      {/* Botão Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute left-4 top-4 z-40 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 text-slate-500 dark:text-white/70 transition-colors hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white lg:hidden"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Overlay Escuro Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm lg:hidden transition-colors"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar do Professor */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-white/10 px-4 lg:hidden">
          <span className="font-semibold text-slate-900 dark:text-white">Menu Professor</span>
          <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-slate-500 dark:text-white/50 hover:bg-slate-100 dark:hover:bg-white/10">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="space-y-2 p-4 pt-8">
          
          {/* 1. PAINEL INICIAL (Teacher Dashboard) */}
          <Link 
            href="/teacher" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors border ${
              pathname === '/teacher' 
                ? 'border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Visão Geral
          </Link>

          {/* 2. MEUS ALUNOS */}
          <Link 
            href="/teacher/students" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors border ${
              pathname.includes('/teacher/students')
                ? 'border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Meus Alunos
          </Link>

          {/* 3. AGENDA DE AULAS */}
          <Link 
            href="/teacher/agenda" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors border ${
              pathname.includes('/teacher/agenda')
                ? 'border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Minha Agenda
          </Link>

          {/* 4. CRIAR DECKS / MATERIAIS */}
          <Link 
            href="/teacher/materials" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors border ${
              pathname.includes('/teacher/materials')
                ? 'border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                : 'border-transparent text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Gerenciar Materiais
          </Link>
          
        </nav>
      </aside>
    </>
    );
}