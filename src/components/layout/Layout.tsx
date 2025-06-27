import type { ReactNode } from 'react';
import Navbar from './Navbar';
import AvisoDesenvolvimento from './AvisoDesenvolvimento';
import { useTheme } from '../../context/ThemeContext';
import { useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Aplicar classe para transições suaves ao mudar de tema
  useEffect(() => {
    // Adicionar classe para transições suaves ao body
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-300');
    
    // Aplicar cores de fundo e texto ao body também
    document.body.className = `
      transition-colors duration-300
      ${isDark 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-white text-gray-800'
      }
    `;
  }, [isDark]);

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-white text-gray-800'
      } relative overflow-hidden transition-colors duration-300`}>
      {/* Aviso de desenvolvimento */}
      <AvisoDesenvolvimento />

      {/* Padrão geométrico decorativo - adaptado para tema escuro */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.07] pointer-events-none hidden md:block">
        <div className={`absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full ${
          isDark 
            ? 'bg-blue-500' 
            : 'bg-[#062140]'
          } opacity-20 blur-3xl`}></div>
        <div className={`absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full ${
          isDark 
            ? 'bg-emerald-400' 
            : 'bg-[#fed282]'
          } opacity-10 blur-3xl`}></div>
      </div>

      {/* Grade decorativa - adaptada para tema escuro */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5 dark:opacity-[0.07] pointer-events-none"></div>

      {/* Efeito de gradiente sutil no topo - adaptado para tema escuro */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${
        isDark 
          ? 'from-blue-500/10' 
          : 'from-[#062140]/10'
        } to-transparent pointer-events-none`}></div>

      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="relative">{children}</main>

      {/* Rodapé sutil */}
      <footer className={`relative mt-auto py-6 px-4 text-center text-xs ${
        isDark 
          ? 'text-gray-400 border-t border-gray-700' 
          : 'text-gray-500 border-t border-[#fed282]/50'
        } transition-colors duration-300`}>
        <p>MeuCofre &copy; {new Date().getFullYear()} - Gerencie suas finanças com estilo</p>
      </footer>
    </div>
  );
}