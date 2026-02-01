'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { STORE_URLS } from '@/constants/storeUrls';
import { QRCodeSVG } from 'qrcode.react';

type Platform = 'ios' | 'android' | 'other';
type HandoffState = 'idle' | 'attempting' | 'fallback';

type ListItemPreview = {
    id: string;
    snapshotName: string;
    snapshotCoverUrl?: string | null;
};

type ListPreview = {
    id: string;
    title: string;
    description?: string | null;
    coverImageUrl?: string | null;
    items: ListItemPreview[];
};

const previewCache = new Map<string, ListPreview>();

async function fetchListByToken(token: string, signal: AbortSignal): Promise<ListPreview> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('NEXT_PUBLIC_API_BASE_URL is not set. Skipping list fetch.');
        }
        throw new Error('API base URL not configured');
    }

    const url = `${apiBaseUrl}/lists/by-token?token=${encodeURIComponent(token)}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new Error(`Failed to fetch list: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data.id === 'undefined' || typeof data.title !== 'string') {
        throw new Error('Invalid list response: missing required fields');
    }

    const items: ListItemPreview[] = (data.items || []).map((item: any) => ({
        id: String(item.id),
        snapshotName: item.snapshotName ?? item.snapshot_name ?? 'Unknown',
        snapshotCoverUrl: item.snapshotCoverUrl ?? item.snapshot_cover_url ?? null,
    }));

    return {
        id: data.id,
        title: data.title,
        description: data.description ?? null,
        coverImageUrl: data.coverImageUrl ?? data.cover_image_url ?? null,
        items,
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

export default function ListPageClient() {
    const searchParams = useSearchParams();
    const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);

    const [platform, setPlatform] = useState<Platform>('other');
    const [isMobile, setIsMobile] = useState(false);

    const [handoffState, setHandoffState] = useState<HandoffState>(() => {
        if (typeof window !== 'undefined') {
            const persisted = sessionStorage.getItem('nextquest-list-handoff-fallback');
            return persisted === 'true' ? 'fallback' : 'idle';
        }
        return 'idle';
    });

    const [hydrated, setHydrated] = useState(false);
    const [previewState, setPreviewState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [previewData, setPreviewData] = useState<ListPreview | null>(null);

    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const ua = navigator.userAgent || (navigator as any).vendor || '';
        setPlatform(detectPlatform(ua));
        setIsMobile(/mobi|android|iphone|ipad|ipod/i.test(ua));
        setHydrated(true);
    }, []);

    const openApp = useCallback(() => {
        if (!token) return;
        const appUrl = `nextquest://list?token=${encodeURIComponent(token)}`;
        window.location.href = appUrl;
    }, [token]);

    const handleOpen = useCallback(() => {
        if (!token || !isMobile) return;

        setHandoffState('attempting');
        openApp();

        if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = setTimeout(() => {
            setHandoffState('fallback');
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('nextquest-list-handoff-fallback', 'true');
            }
        }, 900);
    }, [token, isMobile, openApp]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                if (fallbackTimeoutRef.current) {
                    clearTimeout(fallbackTimeoutRef.current);
                    fallbackTimeoutRef.current = null;
                }
                if (handoffState === 'attempting') setHandoffState('idle');
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [handoffState]);

    useEffect(() => {
        if (!isMobile || !token || handoffState === 'fallback') return;
        const timeoutId = setTimeout(handleOpen, 500);
        return () => clearTimeout(timeoutId);
    }, [isMobile, token, handoffState, handleOpen]);

    const listPageUrl = useMemo(() => {
        if (typeof window === 'undefined' || !token) return '';
        const base = process.env.NEXT_PUBLIC_QR_BASE_URL?.trim() || window.location.origin;
        const url = new URL('/list', base);
        url.searchParams.set('token', token);
        return url.toString();
    }, [token]);

    useEffect(() => {
        if (!hydrated || !token) return;

        const cached = previewCache.get(token);
        if (cached) {
            setPreviewState('success');
            setPreviewData(cached);
            return;
        }

        const abortController = new AbortController();
        const signal = abortController.signal;
        setPreviewState('loading');
        setPreviewData(null);

        fetchListByToken(token, signal)
            .then((data) => {
                if (signal.aborted) return;
                previewCache.set(token, data);
                setPreviewState('success');
                setPreviewData(data);
            })
            .catch((err) => {
                if (err.name === 'AbortError' || signal.aborted) return;
                setPreviewState('error');
                setPreviewData(null);
                if (process.env.NODE_ENV === 'development') console.warn('Failed to fetch list:', err);
            });

        return () => abortController.abort();
    }, [hydrated, token]);

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
                </div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image src="/images/adaptive-icon.png" alt="NextQuest Logo" width={44} height={44} unoptimized />
                            </div>
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                                <div className={styles.subtitle}>Link error</div>
                            </div>
                        </div>
                        <h1 className={styles.title}>List Not Found</h1>
                        <p className={styles.description}>
                            Please provide a valid list link (e.g. <span className={styles.mono}>/list?token=…</span>).
                        </p>
                        <div className={styles.actions}>
                            <Link href="/" className={styles.linkButton}>Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderListPreview = () => {
        if (previewState === 'idle') return null;

        if (previewState === 'loading') {
            return (
                <div className={styles.previewSection}>
                    <div className={styles.previewLabel}>You&apos;re about to open</div>
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

        if (previewState === 'success' && previewData) {
            return (
                <div className={styles.previewSection}>
                    <div className={styles.previewLabel}>You&apos;re about to open</div>
                    <div className={styles.previewContainer}>
                        {previewData.coverImageUrl ? (
                            <div className={styles.previewCover}>
                                <Image
                                    src={previewData.coverImageUrl}
                                    alt=""
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
                            <div className={styles.previewName}>{previewData.title}</div>
                            {previewData.items.length > 0 && (
                                <div className={styles.previewMeta}>
                                    {previewData.items.length} game{previewData.items.length !== 1 ? 's' : ''}
                                </div>
                            )}
                        </div>
                    </div>
                    {previewData.description?.trim() && (
                        <p className={styles.previewDescription}>{previewData.description}</p>
                    )}
                    {previewData.items.length > 0 && (
                        <div className={styles.gamesGrid}>
                            <div className={styles.gamesGridLabel}>Games in this list</div>
                            <ul className={styles.gamesGridList}>
                                {previewData.items.slice(0, 12).map((item) => (
                                    <li key={item.id} className={styles.gamesGridItem}>
                                        {item.snapshotCoverUrl ? (
                                            <div className={styles.gamesGridCover}>
                                                <Image
                                                    src={item.snapshotCoverUrl}
                                                    alt=""
                                                    width={48}
                                                    height={48}
                                                    unoptimized
                                                    className={styles.gamesGridCoverImage}
                                                />
                                            </div>
                                        ) : (
                                            <div className={`${styles.gamesGridCover} ${styles.gamesGridCoverPlaceholder}`} />
                                        )}
                                        <span className={styles.gamesGridName}>{item.snapshotName}</span>
                                    </li>
                                ))}
                            </ul>
                            {previewData.items.length > 12 && (
                                <p className={styles.gamesGridMore}>+{previewData.items.length - 12} more</p>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    const isAndroid = platform === 'android';
    const isIOS = platform === 'ios';
    const storeUrl = isAndroid ? STORE_URLS.android : STORE_URLS.ios;
    const storeName = isAndroid ? 'Google Play' : 'App Store';

    if (isMobile) {
        const isAttempting = handoffState === 'attempting';

        return (
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.card}>
                        <div className={styles.brandRow}>
                            <div className={styles.logoMark} aria-hidden>
                                <Image src="/images/adaptive-icon.png" alt="NextQuest Logo" width={44} height={44} unoptimized />
                            </div>
                            <div>
                                <div className={styles.brand}>NextQuest</div>
                            </div>
                        </div>
                        <h1 className={styles.title}>Open list in NextQuest</h1>
                        {renderListPreview()}
                        <div className={styles.actions}>
                            <button type="button" className={styles.primaryButton} onClick={handleOpen}>
                                {isAttempting ? 'Opening…' : 'Open in NextQuest'}
                            </button>
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
                        </div>
                        <p className={styles.descriptionMuted}>If it&apos;s not installed, you&apos;ll be guided to download it.</p>
                        <div className={styles.divider} />
                        <div className={styles.bottomRow}>
                            <Link href="/" className={styles.linkButton}>Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.shell}>
                <div className={styles.card}>
                    <div className={styles.brandRow}>
                        <div className={styles.logoMark} aria-hidden>
                            <Image src="/images/adaptive-icon.png" alt="NextQuest Logo" width={44} height={44} unoptimized />
                        </div>
                        <div>
                            <div className={styles.brand}>NextQuest</div>
                        </div>
                    </div>
                    <h1 className={styles.title}>NextQuest is a mobile app</h1>
                    <p className={styles.description}>
                        Scan the QR code on your phone to open this list or install the app.
                    </p>
                    {renderListPreview()}
                    <div className={styles.storePicker}>
                        <div className={styles.storeBadgesContainer}>
                            <a href={STORE_URLS.ios} className={`${styles.storeBadgeLink} ${styles.appStoreBadge}`} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
                                <Image src="/app_store.svg" alt="Download on the App Store" width={120} height={40} className={styles.storeBadge} />
                            </a>
                            <a href={STORE_URLS.android} className={`${styles.storeBadgeLink} ${styles.googlePlayBadge}`} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
                                <Image src="/google_play_store.svg" alt="Get it on Google Play" width={135} height={40} className={styles.storeBadge} />
                            </a>
                        </div>
                        <div className={styles.qrCodeSection}>
                            <div className={styles.qrCodeLabel}>Scan to open list or install</div>
                            <div className={styles.qrCodeContainer}>
                                <div className={styles.qrCodeWrapper}>
                                    <QRCodeSVG
                                        value={listPageUrl}
                                        size={160}
                                        level="M"
                                        includeMargin={false}
                                        fgColor="currentColor"
                                        bgColor="transparent"
                                        style={{ color: 'var(--current-text)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.bottomRow}>
                        <Link href="/" className={styles.backLink}>Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
