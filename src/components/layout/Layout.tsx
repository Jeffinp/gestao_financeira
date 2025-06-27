import type { ReactNode } from 'react';
import Navbar from './Navbar';
import AvisoDesenvolvimento from './AvisoDesenvolvimento';

import { useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  // Aplicar classe para transições suaves ao mudar de tema
  useEffect(() => {
    // Adicionar classe para transições suaves ao body
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-300');
    
    // Aplicar cores de fundo e texto ao body também
    document.body.className = `
      transition-colors duration-300
      bg-background text-foreground
      dark:bg-background dark:text-foreground
    `;
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-background text-foreground dark:text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Aviso de desenvolvimento */}
      <AvisoDesenvolvimento />

      {/* Padrão geométrico decorativo - adaptado para tema escuro */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.07] pointer-events-none hidden md:block">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-shop-primary dark:bg-shop-primary opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-shop-accent dark:bg-shop-accent opacity-10 blur-3xl"></div>
      </div>

      {/* Grade decorativa - adaptada para tema escuro */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5 dark:opacity-[0.07] pointer-events-none"></div>

      {/* Efeito de gradiente sutil no topo - adaptado para tema escuro */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-shop-primary/5 dark:from-shop-primary/10 to-transparent pointer-events-none"></div>

      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="relative">{children}</main>

      {/* Rodapé sutil */}
      <footer className="relative mt-auto py-6 px-4 text-center text-xs text-muted-foreground dark:text-muted-foreground border-t border-border/10 dark:border-border/20 transition-colors duration-300">
        <p>MeuCofre &copy; {new Date().getFullYear()} - Gerencie suas finanças com estilo</p>
      </footer>
    </div>
  );
}