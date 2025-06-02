import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Gastos', path: '/gastos' },
    { name: 'Ganhos', path: '/ganhos' },
    { name: 'Histórico', path: '/historico' },
    { name: 'Agenda', path: '/agenda' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="container flex items-center justify-between h-16">
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-bold text-primary text-xl">MeuCofre</span>
                    </Link>
                </div>

                <div className="flex-1 flex justify-center">
                    <ul className="flex space-x-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex-1 flex justify-end">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
        </nav>
    );
} 