import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar tooltip após um pequeno delay quando hover
  useEffect(() => {
    let timer: number;
    if (isHovered) {
      timer = setTimeout(() => setShowTooltip(true), 500);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-2.5 rounded-full relative bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors duration-300 overflow-hidden ${className}`}
        aria-label={
          theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
        }
      >
        {/* Efeito de brilho ao passar o mouse */}
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          } ${
            theme === "dark"
              ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
              : "bg-gradient-to-br from-amber-200/20 to-yellow-300/20"
          }`}
        />

        {/* Ícones com animação de transição */}
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ripple effect on click */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 transform scale-0 rounded-full bg-current opacity-10 animate-ripple"></span>
        </span>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute right-0 mt-2 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            {theme === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}
            <span className="absolute -top-1 right-3 w-2 h-2 bg-popover rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
