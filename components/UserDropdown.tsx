'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type UserDropdownProps = {
    email: string;
};

export default function UserDropdown({email}: UserDropdownProps) {
    const supabase = createClient();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    const initial = email?.charAt(0).toUpperCase() || 'U';

    useEffect (() => {
        function handleClickOutside(event: MouseEvent) {
            if (!dropdownRef.current) return;

            if (!dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    async function handleLogout() {
        setErrorMessage('');
        setIsLoading(true);

        const { error } = await supabase.auth.signOut();

        if (error) {
            setErrorMessage('Não foi possível sair da conta.');
            setIsLoading(false);
        return;
        }

        router.push('/login');
        router.refresh();
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-white transition hover:bg-white/10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {initial}
        </div>

        <div className="hidden sm:block">
          <p className="text-xs text-white/50">Conta</p>
          <p className="max-w-[180px] truncate text-sm font-medium">{email}</p>
        </div>

        <span className="text-xs text-white/50">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
          <div className="border-b border-white/10 px-3 py-3">
            <p className="text-xs text-white/50">Logado como</p>
            <p className="truncate text-sm font-medium text-white">{email}</p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoading}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{isLoading ? 'Saindo...' : 'Sair'}</span>
              <span>↗</span>
            </button>
          </div>

          {errorMessage && (
            <p className="px-3 pt-2 text-sm text-red-400">{errorMessage}</p>
          )}
        </div>
      )}
    </div> 
  );
}