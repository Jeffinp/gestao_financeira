import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar o menu quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Obter o ícone correto para o tema atual
  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  // Obter o texto para o tema atual
  const getCurrentThemeText = () => {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Escuro';
      case 'system':
        return 'Sistema';
      default:
        return 'Claro';
    }
  };

  const themeOptions = [
    { id: 'light', name: 'Claro', icon: Sun },
    { id: 'dark', name: 'Escuro', icon: Moon },
    { id: 'system', name: 'Sistema', icon: Monitor },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg bg-secondary/80 dark:bg-secondary/30 hover:bg-secondary dark:hover:bg-secondary/50 text-secondary-foreground dark:text-secondary-foreground transition-colors duration-300"
        aria-label="Selecionar tema"
      >
        {getCurrentThemeIcon()}
        <span className="text-sm hidden md:inline">{getCurrentThemeText()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-card dark:bg-card border border-border dark:border-border shadow-lg dark:shadow-lg dark:shadow-black/20 z-50 overflow-hidden"
          >
            <div className="p-1">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setTheme(option.id as 'light' | 'dark' | 'system');
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-md text-sm ${
                    theme === option.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary/50 dark:hover:bg-secondary/20 text-foreground dark:text-foreground'
                  } transition-colors duration-200`}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{option.name}</span>
                  {theme === option.id && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
            
            <div className="p-2 border-t border-border dark:border-border">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                Escolha o tema de sua preferência
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 