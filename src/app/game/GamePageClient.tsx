'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { STORE_URLS } from '@/constants/storeUrls';

type Platform = 'ios' | 'android' | 'other';

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

    // ✅ render-gate: hide everything until detection runs to prevent flicker
    const [hydrated, setHydrated] = useState(false);

    // Prevent repeated auto-attempts (especially on iOS)
    const autoAttemptedRef = useRef(false);

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

    useEffect(() => {
        if (!hydrated) return;
        if (!gameId) return;
        if (!isMobile) return;
        if (autoAttemptedRef.current) return;

        // Only do an automatic attempt on iOS (optional).
        if (platform !== 'ios') return;

        autoAttemptedRef.current = true;
        openApp();
    }, [hydrated, gameId, isMobile, platform, openApp]);

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

    const isAndroid = platform === 'android';
    const isIOS = platform === 'ios';

    const headline = isMobile ? 'Open in NextQuest' : 'NextQuest is mobile';
    const blurb = isMobile
        ? isAndroid
            ? 'If NextQuest is installed, this should open the app. If it didn’t, use the button below.'
            : 'Trying to open the NextQuest app… If nothing happens, use the button below.'
        : 'Open this link on your phone to view the full details in the app.';

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
                            <div className={styles.subtitle}>
                                {isMobile ? (isIOS ? 'iOS App Available' : isAndroid ? 'Android App Available' : 'Mobile App Available') : 'Desktop App Available'}
                            </div>
                        </div>
                    </div>

                    <h1 className={styles.title}>{headline}</h1>
                    <p className={styles.description}>{blurb}</p>

                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Game ID</span>
                        <span className={styles.metaValue}>{gameId}</span>
                    </div>

                    {isMobile ? (
                        <div className={styles.actions}>
                            <button type="button" className={styles.primaryButton} onClick={openApp}>
                                Open in NextQuest
                            </button>

                            {isAndroid && (
                                <a href={STORE_URLS.android} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                                    Get it on Google Play
                                </a>
                            )}

                            {isIOS && (
                                <a href={STORE_URLS.ios} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                                    Download on App Store
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className={styles.actions}>
                            <a href={STORE_URLS.ios} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
                                Download on App Store
                            </a>
                            <a href={STORE_URLS.android} className={styles.secondaryButton} target="_blank" rel="noopener noreferrer">
                                Get it on Google Play
                            </a>
                        </div>
                    )}

                    <div className={styles.divider} />

                    <div className={styles.bottomRow}>
                        <Link href="/" className={styles.linkButton}>
                            Back to Home
                        </Link>

                        {/* optional: a subtle “try again” without being pushy */}
                        {isMobile && (
                            <button type="button" className={styles.ghostButton} onClick={openApp}>
                                Try opening again
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.footerHint}>
                    Tip: If the app doesn’t open, make sure NextQuest is installed and updated.
                </div>
            </div>
        </div>
    );
}
