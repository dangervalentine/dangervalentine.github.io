'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { STORE_URLS } from '@/constants/storeUrls';

type Platform = 'ios' | 'android' | 'other';
type HandoffState = 'idle' | 'attempting' | 'fallback';

type GamePreview = {
    id: string | number;
    name: string;
    coverUrl?: string;
    releaseYear?: number;
    platformNames?: string[];
};

// In-memory cache for game previews
const previewCache = new Map<string, GamePreview>();

async function fetchGamePreview(gameId: string, signal: AbortSignal): Promise<GamePreview> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('NEXT_PUBLIC_API_BASE_URL is not set. Skipping game preview fetch.');
        }
        throw new Error('API base URL not configured');
    }

    const url = `${apiBaseUrl}/preview/games/${gameId}`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error(`Failed to fetch game preview: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Minimal runtime validation: ensure required fields exist
    if (!data || typeof data.id === 'undefined' || typeof data.name !== 'string') {
        throw new Error('Invalid game preview response: missing required fields');
    }

    // Map API response to GamePreview shape
    return {
        id: data.id,
        name: data.name,
        coverUrl: data.coverUrl || data.cover_url || data.coverImage || data.cover_image,
        releaseYear: data.releaseYear || data.release_year || data.year,
        platformNames: data.platformNames || data.platform_names || data.platforms,
    };
}

function detectPlatform(userAgent: string): Platform {
    const ua = userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    return 'other';
}

export default function GamePageClient() {
    const searchParams = useSearchParams();
    const gameId = useMemo(() => searchParams.get('id') ?? '', [searchParams]);

    const [platform, setPlatform] = useState<Platform>('other');
    const [isMobile, setIsMobile] = useState(false);

    // Check sessionStorage for persisted fallback state
    const [handoffState, setHandoffState] = useState<HandoffState>(() => {
        if (typeof window !== 'undefined') {
            const persisted = sessionStorage.getItem('nextquest-handoff-fallback');
            return persisted === 'true' ? 'fallback' : 'idle';
        }
        return 'idle';
    });

    // ✅ render-gate: hide everything until detection runs to prevent flicker
    const [hydrated, setHydrated] = useState(false);

    // Game preview state
    const [previewState, setPreviewState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [previewData, setPreviewData] = useState<GamePreview | null>(null);

    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const ua = navigator.userAgent || (navigator as any).vendor || '';
        const p = detectPlatform(ua);
        setPlatform(p);

        const mobile = /mobi|android|iphone|ipad|ipod/i.test(ua);
        setIsMobile(mobile);

        setHydrated(true);
    }, []);

    const openApp = useCallback(() => {
        if (!gameId) return;
        const appUrl = `nextquest://game/${gameId}`;
        window.location.href = appUrl;
    }, [gameId]);

    const handleOpen = useCallback(() => {
        if (!gameId || !isMobile) return;

        setHandoffState('attempting');
        openApp();

        // Clear any existing timeout
        if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current);
        }

        // Show fallback after timeout if app didn't open
        fallbackTimeoutRef.current = setTimeout(() => {
            setHandoffState('fallback');
            // Persist fallback state to avoid loop on refresh
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('nextquest-handoff-fallback', 'true');
            }
        }, 900);
    }, [gameId, isMobile, openApp]);

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

    // Fetch game preview when hydrated and gameId is available
    useEffect(() => {
        if (!hydrated || !gameId) {
            return;
        }

        // Check cache first
        const cached = previewCache.get(gameId);
        if (cached) {
            setPreviewState('success');
            setPreviewData(cached);
            return;
        }

        // Create abort controller for this fetch
        const abortController = new AbortController();
        const signal = abortController.signal;

        setPreviewState('loading');
        setPreviewData(null);

        fetchGamePreview(gameId, signal)
            .then((data) => {
                // Check if request was aborted
                if (signal.aborted) {
                    return;
                }
                // Store in cache
                previewCache.set(gameId, data);
                setPreviewState('success');
                setPreviewData(data);
            })
            .catch((error) => {
                // Ignore abort errors
                if (error.name === 'AbortError' || signal.aborted) {
                    return;
                }
                // Set error state (non-fatal)
                setPreviewState('error');
                setPreviewData(null);
                if (process.env.NODE_ENV === 'development') {
                    console.warn('Failed to fetch game preview:', error);
                }
            });

        // Cleanup: abort fetch on unmount or gameId change
        return () => {
            abortController.abort();
        };
    }, [hydrated, gameId]);

    // ✅ prevent any UI from flashing in/out before we know the UA
    if (!hydrated) {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden />
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                                <div className={styles.subtitle}>Preparing your link…</div>
                            </div>
                        </div>

                        <div className={styles.loader} aria-label="Loading" />
                        <p className={styles.descriptionMuted}>Detecting your device…</p>
                    </div>
                    <div className={styles.footerHint} />
                </div>
            </div>
        );
    }

    if (!gameId) {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden />
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                                <div className={styles.subtitle}>Link error</div>
                            </div>
                        </div>

                        <h1 className={styles.title}>Game Not Found</h1>
                        <p className={styles.description}>
                            Please provide a valid game ID in the URL (e.g., <span className={styles.mono}>/game?id=123</span>).
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

    // Render game preview section
    const renderGamePreview = () => {
        if (previewState === 'idle') {
            return null;
        }

        if (previewState === 'loading') {
            return (
                <div className={styles.previewSection}>
                    <div className={styles.previewLabel}>You're about to open</div>
                    <div className={styles.previewContainer}>
                        <div className={`${styles.previewCover} ${styles.previewSkeleton}`} aria-hidden />
                        <div className={styles.previewContent}>
                            <div className={`${styles.previewSkeleton} ${styles.previewSkeletonName}`} aria-hidden />
                            <div className={`${styles.previewSkeleton} ${styles.previewSkeletonMeta}`} aria-hidden />
                        </div>
                    </div>
                </div>
            );
        }

        if (previewState === 'error') {
            return (
                // <div className={styles.previewSection}>
                //     <p className={styles.previewError}>
                //         Couldn't load game details, but you can still open the link.
                //     </p>
                // </div>
                undefined
            );
        }

        if (previewState === 'success' && previewData) {
            const metaParts: string[] = [];
            if (previewData.releaseYear) {
                metaParts.push(String(previewData.releaseYear));
            }
            if (previewData.platformNames && previewData.platformNames.length > 0) {
                metaParts.push(previewData.platformNames.join(', '));
            }
            const metaText = metaParts.join(' • ');

            return (
                <div className={styles.previewSection}>
                    <div className={styles.previewLabel}>You're about to open</div>
                    <div className={styles.previewContainer}>
                        {previewData.coverUrl ? (
                            <div className={styles.previewCover}>
                                <Image
                                    src={previewData.coverUrl}
                                    alt={`${previewData.name} cover`}
                                    width={80}
                                    height={80}
                                    unoptimized
                                    className={styles.previewCoverImage}
                                />
                            </div>
                        ) : (
                            <div className={`${styles.previewCover} ${styles.previewCoverPlaceholder}`} aria-hidden />
                        )}
                        <div className={styles.previewContent}>
                            <div className={styles.previewName}>{previewData.name}</div>
                            {metaText && <div className={styles.previewMeta}>{metaText}</div>}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    const isAndroid = platform === 'android';
    const isIOS = platform === 'ios';
    const storeUrl = isAndroid ? STORE_URLS.android : isIOS ? STORE_URLS.ios : STORE_URLS.ios;
    const storeName = isAndroid ? 'Google Play' : 'App Store';

    // Mobile: single primary flow with handoff state
    if (isMobile) {
        const showFallback = handoffState === 'fallback';
        const isAttempting = handoffState === 'attempting';

        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image
                                    src={"/images/adaptive-icon.png"}
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

                        <h1 className={styles.title}>Open in NextQuest</h1>

                        {renderGamePreview()}

                        <div className={styles.actions}>
                            {showFallback ? (
                                <a
                                    href={storeUrl}
                                    className={styles.primaryButton}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get NextQuest on {storeName}
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.primaryButton}
                                    onClick={handleOpen}
                                >
                                    {isAttempting ? 'Opening…' : 'Open in NextQuest'}
                                </button>
                            )}
                        </div>

                        <p className={styles.descriptionMuted}>
                            {showFallback
                                ? "Don't have the app yet?"
                                : "If it's not installed, you'll be guided to download it."}
                        </p>

                        <div className={styles.divider} />

                        <div className={styles.bottomRow}>
                            <Link href="/" className={styles.linkButton}>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop: explicit, no auto-attempt
    return (
        <div className={styles.container}>
            <div className={styles.shell}>
                <div className={styles.card}>
                    <div className={styles.brandRow}>
                        <div className={styles.logoMark} aria-hidden>
                            <Image
                                src={"/images/adaptive-icon.png"}
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

                    <h1 className={styles.title}>NextQuest is a mobile app</h1>
                    <p className={styles.description}>
                        Open this link on your phone to continue.
                    </p>

                    {renderGamePreview()}

                    <div className={styles.actions}>
                        <a href={STORE_URLS.ios} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
                            Download on App Store
                        </a>
                        <a href={STORE_URLS.android} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                            Get it on Google Play
                        </a>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.bottomRow}>
                        <Link href="/" className={styles.linkButton}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
