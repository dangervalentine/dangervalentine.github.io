'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getTheme, setTheme, initTheme } from '@/utils/theme';
import styles from './Header.module.css';

export default function Header() {
    const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        initTheme();
        setThemeState(getTheme());
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setThemeState(newTheme);
    };

    // Update logo when theme changes
    useEffect(() => {
        const logoImg = document.querySelector(`.${styles.logo}`) as HTMLImageElement;
        if (logoImg) {
            logoImg.src = theme === 'dark' ? '/images/NextQuest_word_logo.png' : '/images/NextQuest_word_logo_light.png';
        }
    }, [theme]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        src={theme === 'dark' ? '/images/NextQuest_word_logo.png' : '/images/NextQuest_word_logo_light.png'}
                        alt="NextQuest"
                        width={140}
                        height={40}
                        className={styles.logo}
                        priority
                        unoptimized
                    />
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/support" className={styles.navLink}>Support</Link>
                    <Link href="/privacy" className={styles.navLink}>Privacy</Link>
                    <Link href="/terms" className={styles.navLink}>Terms</Link>
                    <Link href="/changelog" className={styles.navLink}>Changelog</Link>
                </nav>

                <div className={styles.actions}>
                    <button
                        onClick={handleThemeToggle}
                        className={styles.themeToggle}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={styles.mobileMenuButton}
                        aria-label="Toggle mobile menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <nav className={styles.mobileNav}>
                    <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link href="/support" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Support</Link>
                    <Link href="/privacy" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Privacy</Link>
                    <Link href="/terms" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Terms</Link>
                    <Link href="/changelog" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Changelog</Link>
                </nav>
            )}
        </header>
    );
}
