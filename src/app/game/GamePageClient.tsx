'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
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

    // Prevent repeated auto-attempts (especially on iOS)
    const autoAttemptedRef = useRef(false);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || '';
        const p = detectPlatform(ua);
        setPlatform(p);

        const mobile = /mobi|android|iphone|ipad|ipod/i.test(ua);
        setIsMobile(mobile);
    }, []);

    const openApp = useCallback(() => {
        if (!gameId) return;
        const appUrl = `nextquest://game/${gameId}`;
        window.location.href = appUrl;
    }, [gameId]);

    useEffect(() => {
        // Only do an automatic attempt on iOS (optional),
        // because Android App Links should handle https:// links directly when verified,
        // and scheme jumps on Android often cause prompts.
        if (!gameId) return;
        if (!isMobile) return;
        if (platform !== 'ios') return;
        if (autoAttemptedRef.current) return;

        autoAttemptedRef.current = true;
        openApp();
    }, [gameId, isMobile, platform, openApp]);

    if (!gameId) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Game Not Found</h1>
                    <p className={styles.description}>
                        Please provide a valid game ID in the URL (e.g., /game?id=123).
                    </p>
                    <Link href="/" className={styles.backLink}>
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const isAndroid = platform === 'android';
    const isIOS = platform === 'ios';

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Open in NextQuest</h1>

                <p className={styles.description}>
                    {isMobile
                        ? isAndroid
                            ? 'If NextQuest is installed, this link should open the app. If it didn’t, use the button below.'
                            : 'Trying to open the NextQuest app… If nothing happens, use the button below.'
                        : 'NextQuest is a mobile app. Open this link on your phone to view the full details.'}
                </p>

                <p className={styles.gameId}>Game ID: {gameId}</p>

                {isMobile && (
                    <div className={styles.storeButtons}>
                        <button type="button" className={styles.storeButton} onClick={openApp}>
                            Open in NextQuest
                        </button>

                        {/* Show the most relevant store button for the platform, but you can show both if you want */}
                        {isAndroid && (
                            <a
                                href={STORE_URLS.android}
                                className={styles.storeButton}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get it on Google Play
                            </a>
                        )}

                        {isIOS && (
                            <a
                                href={STORE_URLS.ios}
                                className={styles.storeButton}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download on App Store
                            </a>
                        )}
                    </div>
                )}

                {!isMobile && (
                    <div className={styles.storeButtons}>
                        <a
                            href={STORE_URLS.ios}
                            className={styles.storeButton}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download on App Store
                        </a>
                        <a
                            href={STORE_URLS.android}
                            className={styles.storeButton}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get it on Google Play
                        </a>
                    </div>
                )}

                <Link href="/" className={styles.backLink}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
