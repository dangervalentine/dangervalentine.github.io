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
            version: '1.5.0',
            date: '2026-02-18',
            summary: 'Lists, Quizzes & Profile Stats',
            highlights: [
                'Lists tab restored with list detail, comments (report/block/delete), deep links, and Add to List bottom sheet',
                'Grid/list layout with default persistence; ranked lists with per-entry notes and collapsible sections',
                'Comments toggle and moderation, NSFW content lock, and list reporting',
                'Catalog (renamed from Search) and new Quizzes tab with preview cards (Guess the Game, Series Challenge, etc.) and streak display',
                'Profile Stats: library breakdown, completion tracking, release-year chart, and activity from profile',
                'TOS/Privacy consent gate for re-acceptance; dev/preview/prod app variants with variant-aware splash and build menu',
                'Search: automatic retry with exponential backoff and manual retry; list search via Elasticsearch with enriched detail',
                'Cache-first facet loading for faster filter setup; scroll track and status bar driven on the UI thread (Reanimated)',
                'List card preview counts; post-auth navigation to correct tab home',
                'Full-screen onboarding with card stack hero, color grouping animation, and "View Onboarding" in settings',
                'Game detail header in-page with actions in header menu and share after title',
                'Custom stacked toasts with swipe-to-dismiss and optional icons',
                'Gallery Photos/Videos order and filter chips; list/game detail gradients and scroll-driven headers aligned with floor background',
                'Tapping outside an active note or section input now blurs and saves without blocking the field (editing lock instead of overlay)',
                'Scroll track shows correctly during scroll; list detail no longer refetches in a loop when returning to the tab',
                'Splash icon path fix',
            ],
        },
        {
            version: '1.4.1',
            date: '2026-01-26',
            summary: 'Videos Get Their Own Space',
            highlights: [
                'Videos now live in a dedicated tab, making the gallery cleaner and easier to navigate',
                'Game notes got a major upgrade with sections, drag-and-drop, and voice transcription',
                'Game list drag-and-drop reordering lets you organize your collection by long-pressing items',
                'Voice transcription for game notes with save/discard controls',
                'Gallery refactored to separate image and video viewing logic for better maintainability',
                'Database backup and restore now available through API endpoints instead of platform-specific scripts',
                'Improved haptic feedback system with three intensity levels (Off, Standard, Enhanced)',
                'Enhanced game notes with collapsible sections, swipe-to-delete, and smoother animations',
                'Fixed Firebase initialization error on iOS that was causing app crashes',
                'Fixed game detail navigation bug where notes button didn\'t work after discovering a game',
            ],
        },
        {
            version: '1.3.3',
            date: '2026-01-03',
            summary: 'Firebase Auth & Avatar Customization',
            highlights: [
                'Completely rebuilt authentication system with Firebase for smoother sign-in and better offline support',
                'Added avatar customization so you can personalize your profile with a full editor',
                'Click any genre, theme, or franchise in game details to instantly search for similar games',
                'Link and unlink authentication providers (Google, Apple, Email) from your account settings',
                'Access Privacy Policy and Terms of Service directly from the Settings screen',
                'Improved initial app boot handling to prevent navigation issues on first launch',
                'Replaced sign-in screen with a modern modal flow that guides you through authentication steps',
                'Tap an active tab button to instantly return to that tab\'s home screen',
                'Fixed issue where games couldn\'t be added immediately after signing in',
                'Fixed initial boot navigation that could cause duplicate screens or loading issues',
            ],
        },
        {
            version: '1.3.0',
            date: '2025-12-22',
            summary: 'Steam Integration & Enhanced Sharing',
            highlights: [
                'Share your favorite games with friends using the new native share button',
                'Link your Steam account to import games and sync your library',
                'Open game links directly in the app from web browsers with deep linking',
                'Mark notes as complete with a simple long-press gesture',
                'Migrate your local games to your account for cloud sync',
                'Discover games faster by clicking genres, themes, and franchises from game details',
                'Complete Steam integration with library sync, playtime tracking, and avatar syncing',
                'Enhanced search with context-based seeding and improved filter management',
                'Improved deep link processing with URL normalization and better state management',
                'Migrated to native stack navigators for better performance and smoother transitions',
            ],
        },
        {
            version: '1.2.2',
            date: '2025-12-08',
            summary: 'Enhanced Discovery & Streamlined Search Experience',
            highlights: [
                'Clickable game metadata navigation - tap genres, themes, and franchises to discover similar games',
                'Comprehensive note-taking system with sections, drag-and-drop reordering, and optimistic updates',
                'Inline notes editing directly in the Personal Rating section',
                'Game modes & player perspectives filtering (single-player, multiplayer, co-op, first-person, third-person, etc.)',
                'Improved search experience with centralized filter management and better state handling',
                'More accurate game release dates showing when games first launched',
                'Enhanced welcome experience with smarter modal timing and helpful filter guidance',
                'Account deletion with deliberate confirmation process',
                'Global loading system with centralized loading state management',
                'Native stack navigation migration for improved performance',
            ],
        },
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
                'Public lists access - browse public and unlisted lists without authentication using share tokens',
                'Custom activity indicator system with branded loading animations',
            ],
        },
        {
            version: '1.1.0',
            date: '2025-09-27',
            summary: 'Lists, Logins & Level-Ups',
            highlights: [
                'Game Lists - build custom collections, drag games around, set covers, and share with friends',
                'One Login to Rule Them All - stay signed in on your device for a whole year',
                'Profiles with avatars, roles (Admin, Mod, Tester), and better account tools',
                'Themes & Filters - tag games by vibe, hide NSFW content if you want',
                'Vote It Up - upvote lists with flashy pill-style voting',
                'Way smoother animations with Reanimated v4',
                'Faster, more resilient login/auth system',
            ],
        },
        {
            version: '1.0.7',
            date: '2025-09-07',
            summary: 'Light Theme & Discover Similar Games',
            highlights: [
                'New Light Theme - switch between light and dark modes with real-time updates',
                'Similar Games Discovery - find related games directly on game detail pages',
                'Enhanced Rating System - see rating counts to understand rating reliability',
                'Improved Visual Design - better spacing, colors, and overall polish',
                'Performance Boost - smoother animations and faster loading',
                'Reanimated Animation System - migrated to React Native Reanimated for smoother animations',
            ],
        },
        {
            version: '1.0.6',
            date: '2025-09-01',
            summary: 'Enhanced Navigation & Search Experience',
            highlights: [
                'Completely redesigned navigation system with modern bottom tabs and improved user flow',
                'Added powerful search capabilities with Steam and IGDB popularity metrics',
                'Enhanced filter system with collapsible sections and improved gesture handling',
                'Configurable game status pill positioning for personalized experience',
                'Standardized UI components with consistent button interactions and visual design',
                'Improved app startup reliability with timeout handling to prevent hanging',
                'Migrated to React Native Reanimated for smooth UI-thread animations',
            ],
        },
        {
            version: '1.0.5',
            date: '2025-08-22',
            summary: 'First iOS Release & Enhanced Performance',
            highlights: [
                'First iOS Release - NextQuest is now available on iOS devices',
                'Significantly improved game list performance with FlashList optimization',
                'Enhanced drag-and-drop functionality with better reordering and visual feedback',
                'Improved search experience with franchise name normalization',
                'Modernized UI components with consistent theming and better accessibility',
                'Fixed critical release date display issues and network state management',
                'Migrated from PanResponder to React Native Gesture Handler for smoother interactions',
            ],
        },
        {
            version: '1.0.4',
            date: '2025-08-15',
            summary: 'Enhanced Game Discovery & Smoother Experience',
            highlights: [
                'Each Game Tab will have its own set of filter and sort options, independent of one another',
                'Learn how long each game would take to beat if you were to play it',
                'Enjoy filtering games by franchises when in the discovery tab',
                'Get automatic update notifications when new versions are available',
                'Game meta data for items in your library will automatically refresh after 30 days',
                'Decrease load time for game images, making the game item lists more smooth',
                'Select a platform or set the initial persona rating value while adding a game',
            ],
        },
        {
            version: '1.0.3',
            date: '2025-08-10',
            summary: 'Smarter Search, Popularity Picks, and Multi-Platform Support',
            highlights: [
                'Smarter search with faster results, better ranking, and fewer false matches',
                'New popularity browsing to quickly discover trending games',
                'Multi-platform awareness so games show and filter correctly across platforms',
                'Cleaner filters with collapsible facets, generation dividers, and quick clears',
                'Smoother experience thanks to reduced jank, request cancellation, and rate limiting',
                'Elasticsearch revamp with single document per game with nested platforms',
                'API performance improvements with debounced inputs and request cancellation',
            ],
        },
        {
            version: '1.0.2',
            date: '2025-07-25',
            summary: 'Enhanced User Experience with Smart Tips & Advanced Filtering',
            highlights: [
                'Smart Tips System - contextual tips that appear when you first use features',
                'Advanced Filtering - filter games by platform, genre, release year, and personal ratings',
                'Settings Modal - new in-app settings panel accessible from the game list menu',
                'Tip Management - control which tips you see and reset them anytime from settings',
                'Move Games - quickly move games to the top or bottom of your list with swipe gestures',
                'Enhanced Performance - optimized game list rendering and reduced unnecessary re-renders',
                'Better Data Management - improved database operations and priority sorting',
            ],
        },
        {
            version: '1.0.1',
            date: '2025-07-17',
            summary: 'Enhanced Game Tracking & Network Connectivity',
            highlights: [
                'Added "Dropped" game status with coral-themed UI and status management',
                'Real-time offline detection with toast notifications and a smart banner',
                'Unified network architecture and improved error handling',
                'UI/UX polish across connectivity and game tracking features',
                'Centralized NetworkService for IGDB, RAWG, and Metacritic calls',
                'Global NetworkContext with smart detection of actual internet access',
                'Fixed rating display for completed games - now only shows ratings when they exist',
            ],
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Changelog</h1>
                <p className={styles.intro}>
                    View the release history and updates for NextQuest.
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
