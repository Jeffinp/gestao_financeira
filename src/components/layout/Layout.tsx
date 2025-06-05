import type { ReactNode } from 'react';
import Navbar from './Navbar';
import AvisoDesenvolvimento from './AvisoDesenvolvimento';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Aviso de desenvolvimento */}
      <AvisoDesenvolvimento />

      {/* Padrão geométrico decorativo - desabilitado temporariamente 
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none hidden md:block">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-shop-primary opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-shop-accent opacity-10 blur-3xl"></div>
      </div>
      */}

      {/* Grade decorativa - desabilitada temporariamente 
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5 pointer-events-none"></div>
      */}

      {/* Efeito de gradiente sutil no topo - desabilitado temporariamente 
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-shop-primary/5 to-transparent pointer-events-none"></div>
      */}

      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="relative">{children}</main>

      {/* Rodapé sutil */}
      <footer className="relative mt-auto py-6 px-4 text-center text-xs text-muted-foreground border-t border-border/10">
        <p>MeuCofre &copy; {new Date().getFullYear()} - Gerencie suas finanças com estilo</p>
      </footer>
    </div>
  );
}