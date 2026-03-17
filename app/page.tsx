import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-center text-white">
      {/* Se quiser usar a logo depois, ela já está importada e pronta */}
      <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">
        Flux Idiomas
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-white/70">
        Aprenda inglês de forma definitiva com nossa plataforma de flashcards e áudio.
      </p>
      
      <Link 
        href="/login" 
        className="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
      >
        Acessar Plataforma
      </Link>
    </main>
  );
}