import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Detectar preferência do sistema e configurar o tema inicial
  useEffect(() => {
    // Verificar se o tema está salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Verificar preferência do sistema se não houver tema salvo
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      return;
    }
    
    setTheme(savedTheme);
  }, []);

  // Aplicar classe 'dark' ao html quando o tema mudar
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Salvar tema no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-200"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-foreground" />
      ) : (
        <SunIcon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
} 