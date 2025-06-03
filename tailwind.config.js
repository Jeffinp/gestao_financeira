/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
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
            container: {
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "2rem",
                },
            },
            colors: {
                border: {
                    DEFAULT: "hsl(var(--border))",
                    dark: "hsl(var(--border-dark))",
                },
                input: {
                    DEFAULT: "hsl(var(--input))",
                    dark: "hsl(var(--input-dark))",
                },
                ring: {
                    DEFAULT: "hsl(var(--ring))",
                    dark: "hsl(var(--ring-dark))",
                },
                background: {
                    DEFAULT: "hsl(var(--background))",
                    dark: "hsl(var(--background-dark))",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                    dark: "hsl(var(--foreground-dark))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    dark: "hsl(var(--primary-dark))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    dark: "hsl(var(--secondary-dark))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                    dark: "hsl(var(--destructive-dark))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                    dark: "hsl(var(--muted-dark))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                    dark: "hsl(var(--accent-dark))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                    dark: "hsl(var(--popover-dark))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                    dark: "hsl(var(--card-dark))",
                },
                // Cores da loja
                shop: {
                    primary: "hsl(var(--shop-primary))",
                    secondary: "hsl(var(--shop-secondary))",
                    accent: "hsl(var(--shop-accent))",
                    highlight: "hsl(var(--shop-highlight))",
                    success: "hsl(var(--shop-success))",
                    warning: "hsl(var(--shop-warning))",
                    error: "hsl(var(--shop-error))",
                    info: "hsl(var(--shop-info))",
                },
            },
            borderColor: {
                DEFAULT: "hsl(var(--border))",
            },
            backgroundColor: {
                DEFAULT: "hsl(var(--background))",
            },
            textColor: {
                DEFAULT: "hsl(var(--foreground))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xl: "calc(var(--radius) + 4px)",
                "2xl": "calc(var(--radius) + 8px)",
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
    },
    plugins: [
        require('@tailwindcss/container-queries'),
    ],
}