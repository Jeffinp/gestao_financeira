/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Cores primárias
                'primary': {
                    50: '#eef5ff',
                    100: '#d9e8ff',
                    200: '#bcd6ff',
                    300: '#8ebcff',
                    400: '#5897ff',
                    500: '#3b74ff',
                    600: '#1f4ff7',
                    700: '#1640e8',
                    800: '#1835bc',
                    900: '#062140',
                    950: '#051426',
                },
                // Cores de acento
                'accent': {
                    50: '#fffaeb',
                    100: '#fff1c6',
                    200: '#ffe488',
                    300: '#ffcf4a',
                    400: '#fed282', // Dourado original
                    500: '#f7a53b',
                    600: '#e07c16',
                    700: '#c45a17',
                    800: '#9c4518',
                    900: '#7e3918',
                    950: '#461c09',
                },
                // Status
                'success': {
                    500: '#10b981',
                    600: '#059669',
                },
                'warning': {
                    500: '#f59e0b',
                    600: '#d97706',
                },
                'error': {
                    500: '#ef4444',
                    600: '#dc2626',
                },
                'info': {
                    500: '#3b82f6',
                    600: '#2563eb',
                },
                // Neutros para tema claro e escuro
                'light': {
                    background: '#ffffff',
                    card: '#ffffff',
                    border: 'rgba(254, 210, 130, 0.2)',
                    text: {
                        primary: '#1f2937',
                        secondary: '#64748b',
                        muted: '#94a3b8',
                    }
                },
                'dark': {
                    background: '#111827',
                    card: 'rgba(31, 41, 55, 0.6)',
                    border: 'rgba(75, 85, 99, 0.5)',
                    text: {
                        primary: '#f3f4f6',
                        secondary: '#d1d5db',
                        muted: '#9ca3af',
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
                'fluid-sm': 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
                'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
                'fluid-lg': 'clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem)',
                'fluid-xl': 'clamp(1.25rem, 1.175rem + 0.375vw, 1.5rem)',
                'fluid-2xl': 'clamp(1.5rem, 1.4rem + 0.5vw, 1.875rem)',
                'fluid-3xl': 'clamp(1.875rem, 1.75rem + 0.625vw, 2.25rem)',
                'fluid-4xl': 'clamp(2.25rem, 2.1rem + 0.75vw, 2.75rem)',
            },
            borderRadius: {
                'xs': '0.25rem',
                'sm': '0.375rem',
                'md': '0.5rem',
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
                'button': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'button-hover': '0 3px 6px rgba(0, 0, 0, 0.15)',
                'dropdown': '0 4px 16px rgba(0, 0, 0, 0.12)',
            },
            spacing: {
                '4.5': '1.125rem',
                '5.5': '1.375rem',
                '6.5': '1.625rem',
                '7.5': '1.875rem',
                '8.5': '2.125rem',
                '9.5': '2.375rem',
            },
            scale: {
                '98': '.98',
                '102': '1.02',
                '103': '1.03',
            },
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-down': 'slideDown 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}