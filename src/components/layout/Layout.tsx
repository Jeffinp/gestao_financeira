import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pb-12 pt-20 px-4 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <footer className="py-8 border-t border-border/40 bg-card/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MeuCofre - Gerenciamento Financeiro Inteligente</p>
        </div>
      </footer>
    </div>
  );
}