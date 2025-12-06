import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Changelog – NextQuest',
    description: 'Release notes and version history for NextQuest.',
    openGraph: {
        title: 'Changelog – NextQuest',
        description: 'Release notes and version history for NextQuest.',
    },
};

export default function ChangelogPage() {
    const versions = [
        {
            version: '1.1.1',
            date: '2025-10-06',
            summary: 'Enhanced Discovery & Smooth Navigation',
            highlights: [
                'Added comprehensive themes filtering (Horror, Fantasy, Sci-Fi, etc.)',
                'Implemented infinite scroll for seamless browsing',
                'Enhanced personal ratings filtering with intuitive range sliders',
                'Added scroll-to-top functionality for better navigation',
                'Improved loading animations and visual consistency',
            ],
        },
        {
            version: '1.1.0',
            date: '2025-09-XX',
            summary: 'Game Lists & Enhanced Profiles',
            highlights: [
                'Custom game lists with sharing capabilities',
                'One-year device sessions (stay logged in)',
                'User profiles with roles and avatars',
                'Upvote/downvote system for lists',
            ],
        },
        {
            version: '1.0.7',
            date: '2025-08-XX',
            summary: 'Themes & Discovery',
            highlights: [
                'Light/Dark theme system',
                'Similar games discovery',
                'Rating count displays',
            ],
        },
        {
            version: '1.0.6',
            date: '2025-07-XX',
            summary: 'Advanced Search & Navigation',
            highlights: [
                'Advanced search with Steam/IGDB metrics',
                'Configurable status pill positioning',
                'Modern bottom tab navigation',
            ],
        },
        {
            version: '1.0.5',
            date: '2025-06-XX',
            summary: 'First iOS Release',
            highlights: [
                'First iOS release',
                'FlashList performance optimization',
                'Multi-platform game tracking',
            ],
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Changelog</h1>
                <p className={styles.intro}>
                    View the release history and updates for NextQuest. For the complete changelog,
                    see our <Link href="https://github.com/dangervalentine/NextQuest/blob/master/CHANGELOG.md" className={styles.link}>GitHub repository</Link>.
                </p>

                <div className={styles.versions}>
                    {versions.map((version, index) => (
                        <div key={index} className={styles.versionCard}>
                            <div className={styles.versionHeader}>
                                <h2 className={styles.versionNumber}>v{version.version}</h2>
                                <span className={styles.versionDate}>{version.date}</span>
                            </div>
                            <p className={styles.versionSummary}>{version.summary}</p>
                            <ul className={styles.highlights}>
                                {version.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className={styles.highlight}>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

