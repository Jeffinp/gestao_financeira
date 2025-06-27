import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system');
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [isMounted, setIsMounted] = useState(false);

    // Detectar preferência do sistema
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Definir tema inicial do sistema
        const updateSystemTheme = () => {
            const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
            setSystemTheme(newSystemTheme);
        };
        
        updateSystemTheme();
        
        // Ouvir mudanças na preferência do sistema
        const listener = () => {
            updateSystemTheme();
        };
        
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    // Inicializar tema do localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setIsMounted(true);
    }, []);

    // Resolver tema final (light ou dark) baseado na configuração
    useEffect(() => {
        const newResolvedTheme = theme === 'system' ? systemTheme : theme;
        setResolvedTheme(newResolvedTheme as 'light' | 'dark');
    }, [theme, systemTheme]);

    // Aplicar tema ao DOM
    useEffect(() => {
        if (!isMounted) return;
        
        const root = document.documentElement;
        
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        // Adicionar um atributo data-theme para CSS mais específico
        root.setAttribute('data-theme', resolvedTheme);
        
        // Salvar tema no localStorage
        localStorage.setItem('theme', theme);
    }, [resolvedTheme, theme, isMounted]);

    // Alternar entre temas
    const toggleTheme = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'light') return 'dark';
            if (prevTheme === 'dark') return 'light';
            // Se estiver no modo 'system', mudar para o oposto do tema do sistema
            return systemTheme === 'light' ? 'dark' : 'light';
        });
    };

    const value = {
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        systemTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook personalizado para usar o contexto
export function useTheme() {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    
    return context;
} 