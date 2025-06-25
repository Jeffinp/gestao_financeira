/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                xs: "480px",
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
        extend: {
            colors: {
                border: {
                    DEFAULT: 'rgb(var(--border) / <alpha-value>)',
                },
                input: {
                    DEFAULT: 'rgb(var(--input) / <alpha-value>)',
                },
                ring: {
                    DEFAULT: 'rgb(var(--ring) / <alpha-value>)',
                },
                background: {
                    DEFAULT: 'rgb(var(--background) / <alpha-value>)',
                },
                foreground: {
                    DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
                },
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
                    foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
                    foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
                    foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
                    foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'rgb(var(--card) / <alpha-value>)',
                    foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
                },
                shop: {
                    primary: 'rgb(var(--shop-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--shop-secondary) / <alpha-value>)',
                    accent: 'rgb(var(--shop-accent) / <alpha-value>)',
                    highlight: 'rgb(var(--shop-highlight) / <alpha-value>)',
                    success: 'rgb(var(--shop-success) / <alpha-value>)',
                    warning: 'rgb(var(--shop-warning) / <alpha-value>)',
                    error: 'rgb(var(--shop-error) / <alpha-value>)',
                    info: 'rgb(var(--shop-info) / <alpha-value>)',
                },
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
                xl: "calc(0.5rem + 4px)",
                "2xl": "calc(0.5rem + 8px)",
            },
            fontSize: {
                // Tamanhos de fonte fluidos
                'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
                'fluid-base': 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)',
                'fluid-lg': 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)',
                'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)',
                'fluid-2xl': 'clamp(1.5rem, 1.3rem + 0.8vw, 2rem)',
                'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1vw, 2.5rem)',
                'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.2vw, 3rem)',
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-in-right": "slideInRight 0.5s ease-in-out",
                "slide-in-left": "slideInLeft 0.5s ease-in-out",
                "slide-in-top": "slideInTop 0.5s ease-in-out",
                "slide-in-bottom": "slideInBottom 0.5s ease-in-out",
                "zoom-in": "zoomIn 0.5s ease-in-out",
                "bounce-once": "bounce 1s ease-in-out 1",
                "pulse-slow": "pulse 3s infinite",
                "spin-slow": "spin 3s linear infinite",
                "ripple": "ripple 0.6s linear",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideInRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInLeft: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInTop: {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideInBottom: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                zoomIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                ripple: {
                    "0%": { transform: "scale(0)", opacity: "0.4" },
                    "100%": { transform: "scale(4)", opacity: "0" },
                },
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
                'width': 'width',
                'colors': 'background-color, border-color, color, fill, stroke',
            },
            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms',
            },
            scale: {
                '102': '1.02',
                '103': '1.03',
                '105': '1.05',
            },
            boxShadow: {
                'card': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                'button': '0 2px 10px -3px rgba(0, 0, 0, 0.2)',
                'button-hover': '0 4px 15px -2px rgba(0, 0, 0, 0.3)',
            },
        },
    }, plugins: [
        function ({ addComponents, addUtilities, addBase }) {
            // Adiciona as variáveis CSS para suporte ao modo escuro
            addBase({
                ':root': {
                    '--background': '255 255 255',
                    '--foreground': '15 23 42',
                    '--card': '255 255 255',
                    '--card-foreground': '15 23 42',
                    '--popover': '255 255 255',
                    '--popover-foreground': '15 23 42',
                    '--primary': '30 64 175',
                    '--primary-foreground': '248 250 252',
                    '--secondary': '241 245 249',
                    '--secondary-foreground': '71 85 105',
                    '--muted': '248 250 252',
                    '--muted-foreground': '100 116 139',
                    '--accent': '241 245 249',
                    '--accent-foreground': '71 85 105',
                    '--destructive': '239 68 68',
                    '--destructive-foreground': '255 255 255',
                    '--border': '226 232 240',
                    '--input': '226 232 240',
                    '--ring': '30 64 175',
                    '--shop-primary': '30 64 175',
                    '--shop-secondary': '71 85 105',
                    '--shop-accent': '16 185 129',
                    '--shop-highlight': '251 146 60',
                    '--shop-success': '34 197 94',
                    '--shop-warning': '245 158 11',
                    '--shop-error': '239 68 68',
                    '--shop-info': '59 130 246',
                },
                '.dark': {
                    '--background': '2 6 23',
                    '--foreground': '248 250 252',
                    '--card': '15 23 42',
                    '--card-foreground': '248 250 252',
                    '--popover': '15 23 42',
                    '--popover-foreground': '248 250 252',
                    '--primary': '59 130 246',
                    '--primary-foreground': '15 23 42',
                    '--secondary': '30 41 59',
                    '--secondary-foreground': '203 213 225',
                    '--muted': '30 41 59',
                    '--muted-foreground': '148 163 184',
                    '--accent': '30 41 59',
                    '--accent-foreground': '203 213 225',
                    '--destructive': '239 68 68',
                    '--destructive-foreground': '248 250 252',
                    '--border': '30 41 59',
                    '--input': '30 41 59',
                    '--ring': '59 130 246',
                    '--shop-primary': '59 130 246',
                    '--shop-secondary': '100 116 139',
                    '--shop-accent': '34 197 94',
                    '--shop-highlight': '251 146 60',
                }
            })

            // Adiciona utilitários personalizados
            const newUtilities = {
                '.text-balance': {
                    'text-wrap': 'balance',
                },
                '.text-pretty': {
                    'text-wrap': 'pretty',
                },
                '.hover-lift': {
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                },
                '.hover-lift:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                },
            }
            addUtilities(newUtilities)

            // Adiciona componentes personalizados para gestão financeira
            const newComponents = {
                '.btn-shop-primary': {
                    backgroundColor: 'rgb(var(--shop-primary))',
                    color: 'white',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
                '.btn-shop-secondary': {
                    backgroundColor: 'rgb(var(--shop-secondary))',
                    color: 'white',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
                '.btn-shop-accent': {
                    backgroundColor: 'rgb(var(--shop-accent))',
                    color: 'white',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
                '.btn-shop-outline': {
                    backgroundColor: 'transparent',
                    color: 'rgb(var(--shop-primary))',
                    border: '1px solid rgb(var(--shop-primary))',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgb(var(--shop-primary))',
                        color: 'white',
                        transform: 'scale(1.05)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
                '.card-financial': {
                    backgroundColor: 'rgb(var(--card))',
                    color: 'rgb(var(--card-foreground))',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                },
                '.badge-success': {
                    backgroundColor: 'rgba(var(--shop-success), 0.1)',
                    color: 'rgb(var(--shop-success))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                },
                '.badge-error': {
                    backgroundColor: 'rgba(var(--shop-error), 0.1)',
                    color: 'rgb(var(--shop-error))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                },
                '.badge-warning': {
                    backgroundColor: 'rgba(var(--shop-warning), 0.1)',
                    color: 'rgb(var(--shop-warning))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                },
                '.badge-primary': {
                    backgroundColor: 'rgba(var(--shop-primary), 0.1)',
                    color: 'rgb(var(--shop-primary))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '9999px',
                    padding: '0.125rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                },
            }
            addComponents(newComponents)
        }
    ],
}