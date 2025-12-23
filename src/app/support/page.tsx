'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: 'How do I back up or sync my data?',
            answer: 'NextQuest automatically syncs your data when you sign in with Google or Apple. Your game library, notes, and lists are stored securely in the cloud and sync across all your devices. Make sure you\'re signed in to ensure your data is backed up.',
        },
        {
            question: 'Does NextQuest require an account?',
            answer: 'An account is required to sync your data across devices and access cloud features. You can sign in with Google or Apple for a seamless experience. However, you can browse public lists without an account.',
        },
        {
            question: 'How do I report a bug?',
            answer: 'Please email us at support@nextquest.dev with details about the issue. Include your device model, OS version, app version, and steps to reproduce the bug. You can also report issues on our GitHub repository.',
        },
        {
            question: 'How do I request a feature?',
            answer: 'We welcome feature requests! Email us at support@nextquest.dev or open an issue on our GitHub repository. Please describe the feature and how it would improve your experience.',
        },
        {
            question: 'Can I use NextQuest offline?',
            answer: 'Yes, you can view your local game library offline. However, features like search, syncing, and accessing new game data require an internet connection. Your data is cached locally for offline viewing.',
        },
        {
            question: 'How do I create a custom list?',
            answer: 'Navigate to the Lists tab, tap the "+" button, and give your list a name and description. You can add games, customize the appearance, and choose visibility settings (Public, Unlisted, or Private).',
        },
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Support</h1>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Get Help</h2>
                    <p className={styles.text}>
                        If you&apos;re experiencing an issue with NextQuest, here&apos;s how to reach us and what
                        information helps us debug and assist you.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Us</h2>
                    <div className={styles.contactInfo}>
                        <p className={styles.text}>
                            <strong>Email:</strong>{' '}
                            <a href="mailto:support@nextquest.dev" className={styles.link}>
                                support@nextquest.dev
                            </a>
                        </p>
                        <p className={styles.text}>
                            <strong>GitHub Issues:</strong>{' '}
                            <a
                                href="https://github.com/dangervalentine/NextQuest/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                Report an issue on GitHub
                            </a>
                        </p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        {faqs.map((faq, index) => (
                            <div key={index} className={styles.faqItem}>
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={openFaq === index}
                                >
                                    <span>{faq.question}</span>
                                    <span className={styles.faqIcon}>
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className={styles.faqAnswer}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Data & Deletion</h2>
                    <div className={styles.dataInfo}>
                        <p className={styles.text}>
                            <strong>What data is stored:</strong>
                        </p>
                        <ul className={styles.list}>
                            <li>Your game library (games, status, ratings, notes)</li>
                            <li>Custom lists and list items</li>
                            <li>Account information (username, avatar, email)</li>
                            <li>App usage analytics and crash logs</li>
                        </ul>
                        <p className={styles.text}>
                            <strong>How to request data deletion:</strong>
                        </p>
                        <p className={styles.text}>
                            To request deletion of your account and all associated data, please email us at{' '}
                            <a href="mailto:support@nextquest.dev" className={styles.link}>
                                support@nextquest.dev


                            </a>
                            {' '}with your account email address. We will process your request within 30 days
                            and confirm when your data has been deleted.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
