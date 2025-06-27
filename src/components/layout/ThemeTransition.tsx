import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

/**
 * Componente que exibe uma animação de transição ao mudar de tema
 */
export default function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const [showTransition, setShowTransition] = useState(false);
  const [lastTheme, setLastTheme] = useState<'light' | 'dark' | null>(null);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    // Só mostrar a animação se não for a primeira renderização
    if (lastTheme !== null && lastTheme !== resolvedTheme) {
      setShowTransition(true);
      
      // Esconder a animação após completar
      const timer = setTimeout(() => {
        setShowTransition(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
    
    setLastTheme(resolvedTheme);
  }, [resolvedTheme, lastTheme]);

  useEffect(() => {
    // Adicionar classe para prevenir flash de tema incorreto durante carregamento
    document.documentElement.classList.add('theme-transition-ready');
    
    // Adicionar classes para transições suaves
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-300');
    
    // Adicionar estilo global para transições suaves
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --transition-duration: 300ms;
      }
      
      .theme-transition-ready * {
        transition: background-color var(--transition-duration) ease-in-out,
                    border-color var(--transition-duration) ease-in-out,
                    color var(--transition-duration) ease-in-out,
                    fill var(--transition-duration) ease-in-out,
                    stroke var(--transition-duration) ease-in-out,
                    opacity var(--transition-duration) ease-in-out,
                    box-shadow var(--transition-duration) ease-in-out !important;
      }
      
      /* Exceções para elementos que não devem ter transição */
      .notransition, 
      .notransition * {
        transition: none !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Remover estilo ao desmontar
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!showTransition) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={resolvedTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black/30"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`rounded-full p-8 shadow-2xl ${
            isDark 
              ? 'bg-gray-800 text-white' 
              : 'bg-[#062140] text-white border border-[#fed282]/20'
          }`}
        >
          {isDark ? (
            <Moon className="w-12 h-12 text-blue-400" />
          ) : (
            <Sun className="w-12 h-12 text-[#fed282]" />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 