/**
 * Theme utilities for mapping mobile app color structure to CSS variable names
 */

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
    primary: {
        light: string;
        main: string;
        dark: string;
    };
    secondary: {
        light: string;
        main: string;
        dark: string;
    };
    accent: {
        cyan: string;
        coral: string;
        green: string;
        pink: string;
        yellow: string;
        purple: string;
    };
    neutral: {
        white: string;
        lightGray: string;
        gray: string;
        darkGray: string;
        black: string;
    };
    background: {
        light: string;
        medium: string;
        dark: string;
        darker: string;
        darkest: string;
    };
    text: {
        primary: string;
        secondary: string;
        inverse: string;
        muted: string;
    };
}

/**
 * Get CSS variable name for a color path
 */
export function getColorVar(path: string): string {
    return `--color-${path.replace(/\./g, '-')}`;
}

/**
 * Set theme on document root
 */
export function setTheme(mode: ThemeMode): void {
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
    }
}

/**
 * Get current theme from localStorage or system preference
 */
export function getTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'dark';

    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored) return stored;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return 'dark';
}

/**
 * Initialize theme on page load
 */
export function initTheme(): void {
    if (typeof window !== 'undefined') {
        const theme = getTheme();
        setTheme(theme);
    }
}

