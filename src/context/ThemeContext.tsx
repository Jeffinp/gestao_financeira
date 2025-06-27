import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useSystemTheme } from '../hooks/useSystemTheme';

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
    // Usar o hook existente para obter o tema do sistema
    const systemTheme = useSystemTheme();
    const [theme, setTheme] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [isMounted, setIsMounted] = useState(false);

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
        if (!isMounted) return;
        
        const newResolvedTheme = theme === 'system' ? systemTheme : theme;
        setResolvedTheme(newResolvedTheme);
    }, [theme, systemTheme, isMounted]);

    // Aplicar tema ao DOM
    useEffect(() => {
        if (!isMounted) return;
        
        const root = document.documentElement;
        
        // Primeiro remover todas as classes de tema para evitar conflitos
        root.classList.remove('light', 'dark');
        
        // Aplicar a classe de tema certa
        root.classList.add(resolvedTheme);
        
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