import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ScreenshotGrid from '@/components/ScreenshotGrid';
import StoreButtons from '@/components/StoreButtons';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'NextQuest – Track Your Games, Your Way',
    description: 'The ultimate mobile companion for managing your game backlog, tracking progress, and discovering what to play next.',
    openGraph: {
        title: 'NextQuest – Track Your Games, Your Way',
        description: 'The ultimate mobile companion for managing your game backlog, tracking progress, and discovering what to play next.',
        type: 'website',
    },
};

export default function HomePage() {
    return (
        <>
            <Hero />

            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Organize your games</h2>
                    <div className={styles.statusRow}>
                        <span className={`${styles.statusPill} ${styles.statusOngoing}`}>Ongoing</span>
                        <span className={`${styles.statusPill} ${styles.statusBacklog}`}>Backlog</span>
                        <span className={`${styles.statusPill} ${styles.statusCompleted}`}>Completed</span>
                        <span className={`${styles.statusPill} ${styles.statusDropped}`}>Dropped</span>
                    </div>
                    <p className={styles.featureDescription}>
                        Organize your gaming journey with clear status categories. Track what you&apos;re playing,
                        what&apos;s next, what you&apos;ve finished, and what you&apos;ve set aside.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Screenshots</h2>
                    <ScreenshotGrid />
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Discover new games</h2>
                    <div className={styles.discoverContent}>
                        <p className={styles.featureDescription}>
                            Search <span className={styles.highlightNumber}>300,000+</span> titles.
                        </p>
                        <p className={styles.featureDescription}>
                            Filter by platform, genre, release year, and more.
                        </p>
                        <p className={styles.featureDescription}>
                            Find games rated highly by other players.
                        </p>
                    </div>
                    <p className={styles.metadataInfo}>
                        Metadata provided by <a href="https://igdb.com/" target="_blank" rel="noopener noreferrer" className={styles.highlightIgdb}>IGDB</a>.
                    </p>
                    <p className={styles.freeInfo}>
                        <span className={styles.highlightFree}>Free</span> with no subscriptions.
                    </p>
                </div>
            </section>

            <section id="beta" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.ctaSection}>
                        <h2 className={styles.ctaTitle}>Start tracking your gaming adventures!</h2>
                        <StoreButtons />
                        <div className={styles.betaInfo}>
                            <p className={styles.betaText}>
                                <strong>For Android:</strong> You can join the closed beta by{' '}
                                <a
                                    href="https://groups.google.com/g/nextquest-closed-testing/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.betaLink}
                                >
                                    joining the group
                                </a>
                                , and then the link above will work.
                            </p>
                            <p className={styles.betaText}>
                                <strong>For iOS:</strong> Please reach out to{' '}
                                <a
                                    href="mailto:support@nextquest.dev"
                                    className={styles.betaLink}
                                >
                                    support@nextquest.dev
                                </a>
                                {' '}and request permission by sharing your Apple ID in an email.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
