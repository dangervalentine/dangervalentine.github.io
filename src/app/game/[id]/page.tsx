'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { STORE_URLS } from '@/constants/storeUrls';

export default function GamePage() {
    const params = useParams();
    const gameId = params.id as string;
    const [isMobile, setIsMobile] = useState(false);
    const [redirectAttempted, setRedirectAttempted] = useState(false);

    useEffect(() => {
        // Detect if we're on mobile
        const userAgent = navigator.userAgent || navigator.vendor;
        const mobile = /Mobi|Android/i.test(userAgent);
        setIsMobile(mobile);

        if (mobile && !redirectAttempted) {
            setRedirectAttempted(true);

            // Try to open app with custom scheme as fallback
            const tryOpenApp = () => {
                const appUrl = `nextquest://game/${gameId}`;
                window.location.href = appUrl;

                // If app doesn't open, redirect to store after short delay
                setTimeout(() => {
                    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
                    const isAndroid = /android/i.test(userAgent);

                    if (isIOS) {
                        window.location.href = STORE_URLS.ios;
                    } else if (isAndroid) {
                        window.location.href = STORE_URLS.android;
                    }
                }, 2500);
            };

            tryOpenApp();
        }
    }, [gameId, redirectAttempted]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Open in NextQuest</h1>
                <p className={styles.description}>
                    {isMobile
                        ? 'Opening the NextQuest app...'
                        : 'NextQuest is a mobile app. View this game on your phone to see the full details.'}
                </p>
                {gameId && (
                    <p className={styles.gameId}>Game ID: {gameId}</p>
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
