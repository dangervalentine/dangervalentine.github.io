import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'NextQuest – Track Your Games, Your Way',
    description: 'The ultimate mobile companion for managing your game backlog, tracking progress, and discovering what to play next.',
    keywords: ['gaming', 'backlog', 'game tracker', 'mobile app', 'iOS', 'Android'],
    authors: [{ name: 'Victor Danger Valentine' }],
    icons: {
        icon: '/images/favicon.ico',
        apple: '/images/favicon.ico',
    },
    openGraph: {
        title: 'NextQuest – Track Your Games, Your Way',
        description: 'The ultimate mobile companion for managing your game backlog, tracking progress, and discovering what to play next.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
