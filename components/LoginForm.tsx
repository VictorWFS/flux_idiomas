'use client';

import {useState} from 'react';
import Image from 'next/image';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log({
            email,
            password,
        });
    }

    return (
        <div className='w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-8 pt-3 shadow-2xl backdrop-blur-md'>
            <div className='mb-1 flex items-center justify-center'>
                <Image 
                    src={"/images/flux-idiomas-logo.png"}
                    width = {100}
                    height={30}
                    priority 
                    className='scale-180'
                />
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <label className='mb-2 block text-sm font-bold text-white'>
                        Email
                    </label>
                    <input 
                    type="email"
                    placeholder='seuemail@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-blue-700' 
                    />
                </div>
                
                <div>
                    <label className='mb-2 block text-sm font-bold text-white'>
                        Senha                      
                    </label>
                    <input 
                    type="password"
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-blue-700'/>
                </div>

                <div className='flex items-center justify-between text-sm'>
                    <a href="#" className='text-white/70 hover:text-white'>
                        Esqueci minha senha
                    </a>

                    <a href="#" className='text-white/70 hover:text-white'>
                        Criar conta
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-900 px-4 py-3 font-medium text-white transition hover:bg-blue-800 cursor-pointer"
                >
                    Entrar
                </button>

            </form>
        </div>
    )
}