import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Support – NextQuest',
    description: 'Get help with NextQuest. Find FAQs, contact information, and learn about data deletion.',
    openGraph: {
        title: 'Support – NextQuest',
        description: 'Get help with NextQuest. Find FAQs, contact information, and learn about data deletion.',
    },
};

export default function SupportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

