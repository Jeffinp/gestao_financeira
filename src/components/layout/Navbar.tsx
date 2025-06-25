import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ShoppingBag, Menu, X, Home, Banknote, TrendingUp, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import ThemeSelector from './ThemeSelector';

const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Gastos', path: '/gastos', icon: Banknote },
    { name: 'Ganhos', path: '/ganhos', icon: TrendingUp }, 
    { name: 'Histórico', path: '/historico', icon: Clock },
    { name: 'Agenda', path: '/agenda', icon: Calendar },
    { name: 'Loja', path: '/loja', icon: ShoppingBag },
];

export default function Navbar() {
    const { resolvedTheme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fechar o menu ao clicar em um item
    const handleNavItemClick = () => {
        setIsMenuOpen(false);
    };

    // Detectar scroll para adicionar mais sombra ao navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Impedir rolagem quando menu mobile está aberto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 dark:bg-card/95 backdrop-blur-sm border-b border-border/20 dark:border-border/10 ${scrollPosition > 10 ? 'shadow-md dark:shadow-lg dark:shadow-black/20' : 'shadow-sm dark:shadow-md dark:shadow-black/10'} transition-all duration-300`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-bold text-shop-primary dark:text-shop-primary text-xl">MeuCofre</span>
                    </Link>
                </div>

                {/* Menu desktop */}
                <div className="hidden md:flex justify-center">
                    <ul className="flex space-x-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/' && location.pathname.startsWith(item.path));
                            const Icon = item.icon;

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive
                                            ? 'bg-shop-primary text-primary-foreground shadow-sm'
                                            : 'text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary/30 hover:text-secondary-foreground dark:hover:text-secondary-foreground'
                                            }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        {item.name}
                                        {item.name === 'Loja' && (
                                            <span className="ml-1 bg-shop-highlight dark:bg-shop-highlight text-white text-xs font-bold px-1.5 py-0.5 rounded-full">Novo</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    {/* Usar o componente ThemeSelector */}
                    <div className="hidden md:block">
                        <ThemeSelector />
                    </div>
                    
                    {/* Usar o ThemeToggle para dispositivos móveis */}
                    <div className="md:hidden">
                        <ThemeToggle />
                    </div>

                    {/* Botão do menu mobile */}
                    <button
                        className="md:hidden p-2 rounded-lg text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary/30 transition-colors"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Menu mobile (drawer lateral) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay para fechar o menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                            onClick={toggleMenu}
                        />

                        {/* Drawer lateral */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-background dark:bg-card border-l border-border/20 dark:border-border/10 shadow-xl dark:shadow-black/30 z-50 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center p-4 border-b border-border/20 dark:border-border/10">
                                    <Link to="/" className="flex items-center gap-2" onClick={handleNavItemClick}>
                                        <span className="font-bold text-shop-primary dark:text-shop-primary text-xl">MeuCofre</span>
                                    </Link>
                                    <button
                                        onClick={toggleMenu}
                                        className="p-2 rounded-lg text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary/30 transition-colors"
                                        aria-label="Fechar menu"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-2">
                                    <ul className="space-y-1 py-2">
                                        {navItems.map((item) => {
                                            const isActive = location.pathname === item.path ||
                                                (item.path !== '/' && location.pathname.startsWith(item.path));
                                            const Icon = item.icon;

                                            return (
                                                <li key={item.path}>
                                                    <Link
                                                        to={item.path}
                                                        onClick={handleNavItemClick}
                                                        className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 w-full ${isActive
                                                            ? 'bg-shop-primary text-primary-foreground shadow-sm'
                                                            : 'text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary/30 hover:text-secondary-foreground dark:hover:text-secondary-foreground'
                                                            }`}
                                                    >
                                                        {Icon && <Icon className="w-5 h-5" />}
                                                        {item.name}
                                                        {item.name === 'Loja' && (
                                                            <span className="ml-1 bg-shop-highlight dark:bg-shop-highlight text-white text-xs font-bold px-1.5 py-0.5 rounded-full">Novo</span>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="p-4 border-t border-border/20 dark:border-border/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground dark:text-muted-foreground">Tema</span>
                                        <ThemeSelector />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
} 