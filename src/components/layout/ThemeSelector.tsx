import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export default function ThemeSelector() {
  const { theme, resolvedTheme, setTheme } = useTheme();
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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const options = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  // Componente para o botão principal
  const ThemeButton = () => {
    const IconComponent = options.find(opt => 
      opt.value === (theme === "system" ? "system" : resolvedTheme)
    )?.icon || Sun;

    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Seletor de tema"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <IconComponent className="h-5 w-5" />
      </motion.button>
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      <ThemeButton />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-11 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[180px] z-50"
          >
            {options.map((option) => {
              const isActive = theme === option.value;
              const IconComponent = option.icon;

              return (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left mb-1 last:mb-0 ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => {
                    setTheme(option.value as "light" | "dark" | "system");
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center justify-center w-7">
                    <IconComponent className="h-4 w-4 mr-2" />
                  </div>

                  <span className="flex-1">{option.label}</span>

                  {isActive && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
