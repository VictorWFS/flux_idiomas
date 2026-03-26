"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // 💡 MOCK DATA: Lista de alunos do professor
  const mockStudents = [
    { id: 1, name: "Ana Beatriz", email: "ana@email.com", level: 12, streak: 15, status: "active", nextClass: "Hoje, 15:30", accuracy: "88%" },
    { id: 2, name: "Carlos Souza", email: "carlos@email.com", level: 8, streak: 2, status: "warning", nextClass: "Amanhã, 10:00", accuracy: "75%" },
    { id: 3, name: "Mariana Silva", email: "mariana@email.com", level: 24, streak: 0, status: "inactive", nextClass: "Sem agendamento", accuracy: "92%" },
    { id: 4, name: "João Pedro", email: "joao@email.com", level: 5, streak: 5, status: "active", nextClass: "Sexta, 14:00", accuracy: "80%" },
  ];

  // Filtro de pesquisa
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-12 pt-14 lg:pt-0 max-w-6xl mx-auto">
      
      {/* CABEÇALHO E PESQUISA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 ml-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            Meus <span className="text-indigo-500">Alunos</span> 👥
          </h2>
          <p className="mt-2 text-slate-500 dark:text-white/50 transition-colors">
            Gerencie o progresso, engajamento e próximas aulas da sua turma.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="h-5 w-5 text-slate-400 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder="Buscar aluno..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* GRID DE ALUNOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-lg hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all flex flex-col">
              
              {/* Header do Card (Avatar + Status) */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-lg border border-indigo-200 dark:border-indigo-500/30 transition-colors">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight transition-colors">{student.name}</h3>
                    <span className="text-xs font-medium text-slate-500 dark:text-white/50 transition-colors">Lvl {student.level}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center">
                  {student.status === 'active' && <span className="flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="Ativo" />}
                  {student.status === 'warning' && <span className="flex h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" title="Risco de inatividade" />}
                  {student.status === 'inactive' && <span className="flex h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" title="Inativo" />}
                </div>
              </div>

              {/* Métricas do Aluno */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 p-3 transition-colors">
                  <p className="text-xs text-slate-500 dark:text-white/40 mb-1 flex items-center gap-1 transition-colors">
                    <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                    Ofensiva
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{student.streak} <span className="text-xs font-medium text-slate-400 dark:text-white/30">dias</span></p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 p-3 transition-colors">
                  <p className="text-xs text-slate-500 dark:text-white/40 mb-1 flex items-center gap-1 transition-colors">
                    <svg className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Acertos
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">{student.accuracy}</p>
                </div>
              </div>

              {/* Próxima Aula */}
              <div className="mb-6 flex-1">
                <p className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider mb-1 transition-colors">Próxima Aula</p>
                <p className="text-sm font-medium text-slate-700 dark:text-white/80 flex items-center gap-2 transition-colors">
                  <svg className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {student.nextClass}
                </p>
              </div>

              {/* Ações */}
              <div className="flex gap-2 mt-auto">
                <Link 
                  href={`/teacher/students/${student.id}`} 
                  className="flex-1 text-center py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors border border-indigo-100 dark:border-indigo-500/20"
                >
                  Ver Perfil
                </Link>
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-white/30 transition-colors">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <p className="text-slate-500 dark:text-white/50 font-medium">Nenhum aluno encontrado com "{searchTerm}"</p>
          </div>
        )}
      </div>

    </section>
  );
}