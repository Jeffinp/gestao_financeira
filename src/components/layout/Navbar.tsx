import { Link, useLocation } from 'react-router-dom';

import { ShoppingBag, Menu, X, Home, Banknote, TrendingUp, Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../../context/ThemeContext';

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
    const isDark = resolvedTheme === 'dark';
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
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${
            isDark 
                ? 'bg-gray-900/95 border-gray-700/50' 
                : 'bg-white/95 border-[#fed282]/50'
            } ${scrollPosition > 10 ? 'shadow-lg' : 'shadow-md'} ${
            isDark ? 'shadow-black/20' : 'shadow-[#062140]/10'
            } transition-all duration-300`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <span className={`font-bold text-xl ${
                            isDark ? 'text-blue-500' : 'text-[#062140]'
                        }`}>MeuCofre</span>
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
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                            isActive
                                                ? isDark
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'bg-[#062140] text-white shadow-sm'
                                                : isDark
                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                                    : 'text-gray-700 hover:text-[#062140] hover:bg-gray-100'
                                        }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        {item.name}
                                        {item.name === 'Loja' && (
                                            <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                                                isDark 
                                                    ? 'bg-amber-500 text-white' 
                                                    : 'bg-[#fed282] text-[#062140]'
                                            }`}>Novo</span>
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
                        className={`md:hidden p-2 rounded-lg transition-colors ${
                            isDark 
                                ? 'text-white hover:bg-gray-800' 
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
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
                            className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm border-l shadow-xl z-50 md:hidden ${
                                isDark 
                                    ? 'bg-gray-900 border-gray-700' 
                                    : 'bg-white border-[#fed282]/50'
                                }`}
                        >
                            <div className="flex flex-col h-full">
                                <div className={`flex justify-between items-center p-4 border-b ${
                                    isDark 
                                        ? 'border-gray-700' 
                                        : 'border-[#fed282]/50'
                                    }`}>
                                    <Link to="/" className="flex items-center gap-2" onClick={handleNavItemClick}>
                                        <span className={`font-bold text-xl ${
                                            isDark ? 'text-blue-500' : 'text-[#062140]'
                                        }`}>MeuCofre</span>
                                    </Link>
                                    <button
                                        onClick={toggleMenu}
                                        className={`p-2 rounded-lg transition-colors ${
                                            isDark 
                                                ? 'text-white hover:bg-gray-800' 
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
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
                                                        className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 w-full ${
                                                            isActive
                                                                ? isDark
                                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                                    : 'bg-[#062140] text-white shadow-sm'
                                                                : isDark
                                                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                                                    : 'text-gray-700 hover:text-[#062140] hover:bg-gray-100'
                                                        }`}
                                                    >
                                                        {Icon && <Icon className="w-5 h-5" />}
                                                        {item.name}
                                                        {item.name === 'Loja' && (
                                                            <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                                                                isDark 
                                                                    ? 'bg-amber-500 text-white' 
                                                                    : 'bg-[#fed282] text-[#062140]'
                                                            }`}>Novo</span>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className={`p-4 border-t ${
                                    isDark 
                                        ? 'border-gray-700' 
                                        : 'border-[#fed282]/50'
                                    }`}>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${
                                            isDark ? 'text-gray-400' : 'text-gray-600'
                                        }`}>Tema</span>
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