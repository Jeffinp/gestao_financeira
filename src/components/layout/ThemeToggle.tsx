import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg relative bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors duration-300 overflow-hidden"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {/* Efeito de fundo animado */}
      <span
        className={`absolute inset-0 transition-colors duration-500 ${theme === 'dark'
            ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
            : 'bg-gradient-to-br from-amber-200/20 to-yellow-300/20'
          }`}
      />

      {/* Ícones com animação de transição */}
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (<motion.div
          key="moon"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
} 