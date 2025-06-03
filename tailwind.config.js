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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
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