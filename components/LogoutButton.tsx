'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
    const supabase = createClient();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogout() {
        setErrorMessage('');
        setIsLoading(true);

        const {error} = await supabase.auth.signOut();
        if (error) {
            setErrorMessage('Não foi possível sair da conta. Tente novamente.');
            setIsLoading(false);
        return;
        }

        router.push('/login')
        router.refresh();
    }

    return (
        <div className="flex flex-col items-end gap-2">       
            <button 
            onClick={handleLogout}
            disabled={isLoading}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:opacity-60"
            > {isLoading ? 'Saindo...' : 'Sair'}
            </button>

            {errorMessage && (
                <p className="text-sm text-red-400">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}