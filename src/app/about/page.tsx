import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About – NextQuest',
    description: 'A lightweight mobile app for tracking your game library and deciding what to play next.',
    openGraph: {
        title: 'About – NextQuest',
        description: 'A lightweight mobile app for tracking your game library and deciding what to play next.',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>About NextQuest</h1>

                <p className={styles.lead}>
                    A lightweight mobile app for tracking your game library and deciding what to play next.
                </p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Supporting development</h2>
                    <p className={styles.text}>
                        NextQuest is free to use. Optional support helps cover ongoing development.
                    </p>
                    <a
                        href="https://ko-fi.com/dangervalentine"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.supportLink}
                    >
                        Support NextQuest on Ko-fi
                    </a>
                </section>
            </div>
        </div>
    );
}
