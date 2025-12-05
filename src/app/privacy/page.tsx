import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy – NextQuest',
    description: 'Privacy Policy for NextQuest - Learn how we collect, use, and protect your data.',
    openGraph: {
        title: 'Privacy Policy – NextQuest',
        description: 'Privacy Policy for NextQuest - Learn how we collect, use, and protect your data.',
    },
};

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last updated: December 3, 2025</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Introduction</h2>
                    <p className={styles.text}>
                        NextQuest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy
                        Policy explains how we collect, use, disclose, and safeguard your information when you
                        use our mobile application.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Information We Collect</h2>
                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Account Information</h3>
                        <p className={styles.text}>
                            When you sign in with Google or Apple, we collect:
                        </p>
                        <ul className={styles.list}>
                            <li>Email address (for account identification)</li>
                            <li>Username (customizable, 3-20 characters)</li>
                            <li>Avatar/profile picture (optional)</li>
                            <li>Authentication tokens (for secure access)</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Game Library Data</h3>
                        <p className={styles.text}>
                            We store the following information about your games:
                        </p>
                        <ul className={styles.list}>
                            <li>Games you add to your library</li>
                            <li>Game status (Backlog, Ongoing, Completed, Dropped)</li>
                            <li>Personal ratings and notes</li>
                            <li>Platform ownership information</li>
                            <li>Custom lists and list items</li>
                        </ul>
                    </div>

                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Usage Data</h3>
                        <p className={styles.text}>
                            We may collect anonymous usage analytics including:
                        </p>
                        <ul className={styles.list}>
                            <li>App version and device information</li>
                            <li>Feature usage statistics</li>
                            <li>Crash reports and error logs</li>
                            <li>Performance metrics</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
                    <p className={styles.text}>We use the collected information to:</p>
                    <ul className={styles.list}>
                        <li>Provide and maintain the app&apos;s core functionality</li>
                        <li>Sync your data across devices</li>
                        <li>Enable social features (public lists, sharing)</li>
                        <li>Improve app performance and fix bugs</li>
                        <li>Send important updates and notifications</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Third-Party Services</h2>
                    <p className={styles.text}>
                        NextQuest uses the following third-party services:
                    </p>
                    <ul className={styles.list}>
                        <li>
                            <strong>Google Sign-In:</strong> For authentication. See Google&apos;s Privacy Policy
                            for how they handle your data.
                        </li>
                        <li>
                            <strong>Apple Sign-In:</strong> For authentication. See Apple&apos;s Privacy Policy
                            for how they handle your data.
                        </li>
                        <li>
                            <strong>IGDB API:</strong> For game metadata and information. We do not share your
                            personal data with IGDB.
                        </li>
                        <li>
                            <strong>Analytics Services:</strong> Anonymous usage analytics may be collected
                            through standard app analytics tools.
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Data Storage and Security</h2>
                    <p className={styles.text}>
                        Your data is stored securely using industry-standard encryption. We implement
                        appropriate technical and organizational measures to protect your personal information
                        against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <p className={styles.text}>
                        Data is stored on secure servers and is accessible only through authenticated API
                        requests using JWT tokens.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Your Rights</h2>
                    <p className={styles.text}>You have the right to:</p>
                    <ul className={styles.list}>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your account and data</li>
                        <li>Export your data (contact us for assistance)</li>
                        <li>Opt out of certain data collection (where applicable)</li>
                    </ul>
                    <p className={styles.text}>
                        To exercise these rights, please contact us at{' '}
                        <a href="mailto:nextquest@dangervalentine.com" className={styles.link}>
                            nextquest@dangervalentine.com
                        </a>.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Data Retention</h2>
                    <p className={styles.text}>
                        We retain your data for as long as your account is active or as needed to provide
                        services. If you request account deletion, we will delete your data within 30 days,
                        except where we are required to retain it for legal purposes.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Children&apos;s Privacy</h2>
                    <p className={styles.text}>
                        NextQuest is not intended for children under 13 years of age. We do not knowingly
                        collect personal information from children under 13. If you believe we have collected
                        information from a child under 13, please contact us immediately.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Changes to This Privacy Policy</h2>
                    <p className={styles.text}>
                        We may update this Privacy Policy from time to time. We will notify you of any changes
                        by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                        You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Us</h2>
                    <p className={styles.text}>
                        If you have any questions about this Privacy Policy or our data practices, please
                        contact us at:
                    </p>
                    <p className={styles.text}>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:nextquest@dangervalentine.com" className={styles.link}>
                            nextquest@dangervalentine.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
