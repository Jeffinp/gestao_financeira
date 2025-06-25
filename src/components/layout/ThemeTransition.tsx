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

  if (!showTransition) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={resolvedTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`rounded-full p-8 ${
            resolvedTheme === 'dark' 
              ? 'bg-background text-foreground' 
              : 'bg-background text-foreground'
          }`}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-12 h-12" />
          ) : (
            <Sun className="w-12 h-12" />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 