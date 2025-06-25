import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar a preferência de tema do sistema operacional
 * @returns {'light' | 'dark'} O tema preferido do sistema
 */
export function useSystemTheme(): 'light' | 'dark' {
  // Estado inicial baseado na preferência do sistema
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    // Fallback para light se não estivermos no navegador
    return 'light';
  });

  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window === 'undefined') return;

    // Criar media query para detectar preferência de tema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Função para atualizar o tema baseado na preferência do sistema
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Adicionar listener para mudanças na preferência
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup: remover listener quando o componente for desmontado
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return systemTheme;
} 