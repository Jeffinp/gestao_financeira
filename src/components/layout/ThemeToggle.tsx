import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { resolvedTheme, toggleTheme } = useTheme();
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
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`rounded-full w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={resolvedTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-11 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs rounded-md py-1 px-2 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {resolvedTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
