'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginForm() {
    // instância do supabase
    const supabase = createClient();

    // instância do router
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        const isValid = validateForm();

        if (!isValid) return;

        setErrors({});
        setIsLoading(true);

        console.log('submit iniciou');
        
        // 1. Tenta fazer o login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        });

        if (authError || !authData.user) {
            setErrors({
                general: "Email ou senha incorretos.",
            });
            setIsLoading(false);
            return;
        }

        // 2. Busca o perfil do usuário para descobrir o "role"
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .maybeSingle(); // 💡 TROCAMOS PARA maybeSingle()

        setIsLoading(false);

        if (profileError) {
            console.error("Erro ao buscar perfil:", profileError);
            setErrors({ general: "Erro ao verificar permissões da conta." });
            return;
        }

        // Se não achar o perfil por algum motivo, assume que é aluno por segurança
        const userRole = profile?.role || 'student';
        console.log('Role do usuário:', userRole);
        
        // 3. O Grande Desvio de Rotas (Professor vs Aluno)
        if (userRole === 'teacher' || userRole === 'admin') {
            router.push('/teacher'); // Leva para o painel de professores
        } else {
            router.push('/dashboard'); // Leva para o painel de alunos
        }
        
        router.refresh();
    }

    function validateForm() {
        const newErrors: {
            email?: string;
            password?: string;
            general?: string;
        } = {};

        if(!email.trim()) {
            newErrors.email = "O email é obrigatório.";
        }

        if (!password.trim()) {
            newErrors.password = "A senha é obrigatória."; // 💡 Corrigido: antes estava salvando no newErrors.email
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        // 💡 Fundo de vidro adaptável (Claro/Escuro)
        <div className='w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/40 p-8 pt-3 shadow-2xl backdrop-blur-md transition-colors'>
            <div className='mb-1 flex items-center justify-center'>
                <Image 
                    src={"/images/flux-idiomas-logo.png"}
                    width={100}
                    height={30}
                    priority 
                    className='scale-180 dark:invert-0' // Pode adicionar 'invert' no futuro se a logo branca sumir no fundo claro
                    alt='Logo Flux Idiomas'
                />
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <label className='mb-2 block text-sm font-bold text-slate-900 dark:text-white transition-colors'>
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder='seuemail@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-700 transition-colors' 
                    />
                    {errors.email && (
                        <p className='mt-2 text-sm text-red-500 dark:text-red-400'>{errors.email}</p>
                    )}
                </div>
                
                <div>
                    <label className='mb-2 block text-sm font-bold text-slate-900 dark:text-white transition-colors'>
                        Senha                      
                    </label>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-blue-600 dark:focus:border-blue-700 transition-colors'
                    />

                    {errors.password && (
                        <p className='mt-2 text-sm text-red-500 dark:text-red-400'>{errors.password}</p>
                    )}
                    
                    {errors.general && (
                        <p className='mt-2 text-sm text-red-500 dark:text-red-400 font-medium'>{errors.general}</p>
                    )}
                    
                    <button 
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='text-xs font-bold text-slate-500 dark:text-white/50 cursor-pointer mt-2 ml-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                    >
                        {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    </button>
                </div>

                {/* 💡 "Criar conta" removido e "Esqueci minha senha" alinhado à direita */}
                <div className='flex items-center justify-end text-sm'>
                    <a href="#" className='font-medium text-slate-500 dark:text-white/70 hover:text-blue-600 dark:hover:text-white transition-colors'>
                        Esqueci minha senha
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-500 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    )
}