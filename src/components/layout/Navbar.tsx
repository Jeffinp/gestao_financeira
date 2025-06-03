import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon, ShoppingBagIcon, HomeIcon, ArrowDownIcon, ArrowUpIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Gastos', path: '/gastos', icon: ArrowDownIcon },
    { name: 'Ganhos', path: '/ganhos', icon: ArrowUpIcon },
    { name: 'Histórico', path: '/historico', icon: ClockIcon },
    { name: 'Agenda', path: '/agenda', icon: CalendarIcon },
    { name: 'Loja', path: '/loja', icon: ShoppingBagIcon },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/30 shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="bg-primary text-primary-foreground w-9 h-9 rounded-lg flex items-center justify-center font-bold shadow-sm">
                                <span>MC</span>
                            </div>
                            <span className="font-bold text-primary text-xl hidden sm:block">MeuCofre</span>
                        </Link>
                    </div>

                    <div className="hidden md:block flex-1 max-w-2xl mx-auto">
                        <div className="flex justify-center">
                            <ul className="flex space-x-1 p-1 bg-muted/50 rounded-xl">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path ||
                                        (item.path !== '/' && location.pathname.startsWith(item.path));
                                    const Icon = item.icon;

                                    return (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isActive
                                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                                    : 'text-foreground hover:bg-muted hover:text-primary'
                                                    }`}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                                <span>{item.name}</span>
                                                {item.name === 'Loja' && (
                                                    <span className="ml-1 bg-shop-highlight text-xs font-bold px-1.5 py-0.5 rounded-full text-white">Novo</span>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Mobile menu - exibido apenas em telas pequenas */}
                    <div className="md:hidden flex-1 flex justify-center">
                        <div className="flex overflow-x-auto scrollbar-hide py-2 px-1 space-x-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path !== '/' && location.pathname.startsWith(item.path));
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex-shrink-0 p-2 rounded-lg text-sm transition-all duration-200 flex flex-col items-center ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground'
                                            }`}
                                    >
                                        {Icon && <Icon className="w-5 h-5" />}
                                        <span className="text-xs mt-1">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors duration-200"
                            aria-label="Alternar tema"
                        >
                            {theme === 'dark' ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}