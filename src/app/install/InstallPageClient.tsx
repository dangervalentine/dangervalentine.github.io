'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { STORE_URLS } from '@/constants/storeUrls';

type Platform = 'ios' | 'android' | 'other';
type HandoffState = 'idle' | 'attempting' | 'fallback';

function detectPlatform(userAgent: string): Platform {
    const ua = userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    return 'other';
}

export default function InstallPageClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const gameId = useMemo(() => searchParams.get('gameId') ?? '', [searchParams]);

    const [platform, setPlatform] = useState<Platform>('other');
    const [handoffState, setHandoffState] = useState<HandoffState>('idle');
    const [hydrated, setHydrated] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasRedirectedRef = useRef(false);

    // Check sessionStorage to avoid infinite loops (with expiration check in dev)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const persisted = sessionStorage.getItem('nextquest-install-fallback');
            if (persisted) {
                const isDev = process.env.NODE_ENV === 'development';
                if (isDev) {
                    // In dev, check if expired (timestamp format)
                    const expiry = parseInt(persisted, 10);
                    if (!isNaN(expiry) && Date.now() < expiry) {
                        setHandoffState('fallback');
                        setHasAttempted(true);
                    } else {
                        // Expired, clear it
                        sessionStorage.removeItem('nextquest-install-fallback');
                    }
                } else {
                    // In prod, simple boolean check
                    if (persisted === 'true') {
                        setHandoffState('fallback');
                        setHasAttempted(true);
                    }
                }
            }
        }
    }, []);

    useEffect(() => {
        const ua = navigator.userAgent || (navigator as any).vendor || '';
        const p = detectPlatform(ua);
        setPlatform(p);
        setHydrated(true);
    }, []);

    const openApp = useCallback(() => {
        if (!gameId) return;
        const appUrl = `nextquest://game/${gameId}`;
        window.location.href = appUrl;
    }, [gameId]);

    const redirectToStore = useCallback(() => {
        if (hasRedirectedRef.current) return;
        hasRedirectedRef.current = true;

        // Compute platform directly from UA to avoid state timing issues
        const ua = navigator.userAgent || (navigator as any).vendor || '';
        const detectedPlatform = detectPlatform(ua);
        const isAndroid = detectedPlatform === 'android';
        const isIOS = detectedPlatform === 'ios';
        const storeUrl = isAndroid ? STORE_URLS.android : isIOS ? STORE_URLS.ios : STORE_URLS.ios;

        // Mark fallback in sessionStorage to avoid loops (with expiration in dev)
        if (typeof window !== 'undefined') {
            const isDev = process.env.NODE_ENV === 'development';
            if (isDev) {
                // In dev, expire after 5 minutes to avoid sabotaging testing
                const expiry = Date.now() + 5 * 60 * 1000;
                sessionStorage.setItem('nextquest-install-fallback', expiry.toString());
            } else {
                sessionStorage.setItem('nextquest-install-fallback', 'true');
            }
        }

        // Use replace to avoid back button confusion
        window.location.replace(storeUrl);
    }, []);

    // Auto-attempt deep link on mount (only once)
    useEffect(() => {
        if (!hydrated || !gameId || hasAttempted || hasRedirectedRef.current) {
            return;
        }

        // Validate gameId (basic check - should be non-empty)
        if (gameId.trim() === '') {
            router.replace('/');
            return;
        }

        setHasAttempted(true);
        setHandoffState('attempting');
        openApp();

        // Set fallback timer
        fallbackTimeoutRef.current = setTimeout(() => {
            if (!hasRedirectedRef.current) {
                setHandoffState('fallback');
                redirectToStore();
            }
        }, 900);
    }, [hydrated, gameId, hasAttempted, openApp, redirectToStore, router]);

    // Cancel fallback if page is backgrounded (app likely opened successfully)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                if (fallbackTimeoutRef.current) {
                    clearTimeout(fallbackTimeoutRef.current);
                    fallbackTimeoutRef.current = null;
                }
                // Reset to idle if we were attempting (app likely opened)
                if (handoffState === 'attempting') {
                    setHandoffState('idle');
                }
                // Clear sessionStorage guard when app opens (helps with testing)
                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('nextquest-install-fallback');
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handoffState]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (fallbackTimeoutRef.current) {
                clearTimeout(fallbackTimeoutRef.current);
            }
        };
    }, []);

    const handleManualOpen = useCallback(() => {
        if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current);
            fallbackTimeoutRef.current = null;
        }
        setHandoffState('attempting');
        openApp();

        // Reset fallback timer
        fallbackTimeoutRef.current = setTimeout(() => {
            if (!hasRedirectedRef.current) {
                setHandoffState('fallback');
                redirectToStore();
            }
        }, 900);
    }, [openApp, redirectToStore]);

    const handleManualStore = useCallback(() => {
        redirectToStore();
    }, [redirectToStore]);

    // Prevent UI flash before hydration
    if (!hydrated) {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image
                                    src="/images/adaptive-icon.png"
                                    alt="NextQuest Logo"
                                    width={44}
                                    height={44}
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                                <div className={styles.subtitle}>Preparing your link…</div>
                            </div>
                        </div>
                        <div className={styles.loader} aria-label="Loading" />
                        <p className={styles.descriptionMuted}>Detecting your device…</p>
                    </div>
                </div>
            </div>
        );
    }

    // If no gameId, show error and redirect
    if (!gameId || gameId.trim() === '') {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image
                                    src="/images/adaptive-icon.png"
                                    alt="NextQuest Logo"
                                    width={44}
                                    height={44}
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                                <div className={styles.subtitle}>Link error</div>
                            </div>
                        </div>
                        <h1 className={styles.title}>Game Not Found</h1>
                        <p className={styles.description}>
                            Please provide a valid game ID in the URL.
                        </p>
                        <div className={styles.actions}>
                            <Link href="/" className={styles.linkButton}>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isAndroid = platform === 'android';
    const isIOS = platform === 'ios';
    const storeUrl = isAndroid ? STORE_URLS.android : isIOS ? STORE_URLS.ios : STORE_URLS.ios;
    const storeName = isAndroid ? 'Google Play' : 'App Store';
    const showFallback = handoffState === 'fallback';
    const isAttempting = handoffState === 'attempting';

    // Unknown platform - show chooser
    if (platform === 'other') {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image
                                    src="/images/adaptive-icon.png"
                                    alt="NextQuest Logo"
                                    width={44}
                                    height={44}
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                            </div>
                        </div>
                        <h1 className={styles.title}>Choose Your Store</h1>
                        <p className={styles.description}>
                            Select your device platform to download NextQuest.
                        </p>
                        <div className={styles.actions}>
                            <a
                                href={STORE_URLS.ios}
                                className={`${styles.storeBadgeLink} ${styles.appStoreBadge}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Download on the App Store"
                            >
                                <Image
                                    src="/app_store.svg"
                                    alt="Download on the App Store"
                                    width={120}
                                    height={40}
                                    className={styles.storeBadge}
                                />
                            </a>
                            <a
                                href={STORE_URLS.android}
                                className={`${styles.storeBadgeLink} ${styles.googlePlayBadge}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Get it on Google Play"
                            >
                                <Image
                                    src="/google_play_store.svg"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className={styles.storeBadge}
                                />
                            </a>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.bottomRow}>
                            <Link href="/" className={styles.backLink}>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Normal flow - attempting or fallback
    return (
        <div className={styles.container}>
            <div className={styles.shell}>
                <div className={styles.card}>
                    <div className={styles.brandRow}>
                        <div className={styles.logoMark} aria-hidden>
                            <Image
                                src="/images/adaptive-icon.png"
                                alt="NextQuest Logo"
                                width={44}
                                height={44}
                                unoptimized
                            />
                        </div>
                        <div>
                            <div className={styles.brand}>NextQuest</div>
                        </div>
                    </div>

                    <h1 className={styles.title}>
                        {showFallback ? 'Get NextQuest' : 'Opening NextQuest…'}
                    </h1>

                    <p className={styles.description}>
                        {showFallback
                            ? "Don't have the app yet? Download it from the store."
                            : 'If the app is installed, it will open automatically.'}
                    </p>

                    <div className={styles.actions}>
                        {showFallback ? (
                            <a
                                href={storeUrl}
                                className={`${styles.storeBadgeLink} ${isAndroid ? styles.googlePlayBadge : styles.appStoreBadge}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Get NextQuest on ${storeName}`}
                            >
                                <Image
                                    src={isAndroid ? '/google_play_store.svg' : '/app_store.svg'}
                                    alt={`Get NextQuest on ${storeName}`}
                                    width={isAndroid ? 135 : 120}
                                    height={40}
                                    className={styles.storeBadge}
                                />
                            </a>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className={styles.primaryButton}
                                    onClick={handleManualOpen}
                                    disabled={isAttempting}
                                >
                                    {isAttempting ? 'Opening…' : 'Open NextQuest'}
                                </button>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={handleManualStore}
                                >
                                    Get the app
                                </button>
                            </>
                        )}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.bottomRow}>
                        <Link href="/" className={styles.backLink}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
