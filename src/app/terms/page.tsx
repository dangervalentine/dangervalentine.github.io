import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Terms of Service – NextQuest',
    description: 'Terms of Service for NextQuest - Read our terms and conditions.',
    openGraph: {
        title: 'Terms of Service – NextQuest',
        description: 'Terms of Service for NextQuest - Read our terms and conditions.',
    },
};

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last updated: December 3, 2025</p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Agreement to Terms</h2>
                    <p className={styles.text}>
                        By accessing or using NextQuest (&quot;the App&quot;), you agree to be bound by these Terms of
                        Service. If you disagree with any part of these terms, you may not access or use the App.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Use License</h2>
                    <p className={styles.text}>
                        Permission is granted to temporarily download and use NextQuest for personal,
                        non-commercial use only. This is the grant of a license, not a transfer of title, and
                        under this license you may not:
                    </p>
                    <ul className={styles.list}>
                        <li>Modify or copy the App</li>
                        <li>Use the App for any commercial purpose</li>
                        <li>Attempt to reverse engineer or decompile the App</li>
                        <li>Remove any copyright or proprietary notations</li>
                        <li>Transfer the App to another person or entity</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Intellectual Property</h2>
                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>App Ownership</h3>
                        <p className={styles.text}>
                            The App and its original content, features, and functionality are owned by Victor
                            Danger Valentine and are protected by international copyright, trademark, patent,
                            trade secret, and other intellectual property laws.
                        </p>
                    </div>
                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>User Content</h3>
                        <p className={styles.text}>
                            You retain ownership of any content you create, upload, or share through the App,
                            including but not limited to game notes, custom lists, and ratings. By using the App,
                            you grant us a license to store, display, and process your content solely for the
                            purpose of providing the App&apos;s services.
                        </p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>User Accounts</h2>
                    <p className={styles.text}>
                        When you create an account with NextQuest, you are responsible for:
                    </p>
                    <ul className={styles.list}>
                        <li>Maintaining the security of your account</li>
                        <li>All activities that occur under your account</li>
                        <li>Providing accurate and complete information</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Prohibited Uses</h2>
                    <p className={styles.text}>You may not use NextQuest:</p>
                    <ul className={styles.list}>
                        <li>In any way that violates any applicable law or regulation</li>
                        <li>To transmit any malicious code or viruses</li>
                        <li>To spam, harass, or abuse other users</li>
                        <li>To impersonate any person or entity</li>
                        <li>To interfere with or disrupt the App&apos;s services</li>
                        <li>To collect or harvest information about other users</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
                    <p className={styles.text}>
                        In no event shall Victor Danger Valentine, nor its directors, employees, partners,
                        agents, suppliers, or affiliates, be liable for any indirect, incidental, special,
                        consequential, or punitive damages, including without limitation, loss of profits,
                        data, use, goodwill, or other intangible losses, resulting from your use of the App.
                    </p>
                    <p className={styles.text}>
                        The App is provided &quot;as is&quot; and &quot;as available&quot; without any warranties, expressed or
                        implied. We do not guarantee that the App will be error-free, secure, or available at
                        all times.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Indemnification</h2>
                    <p className={styles.text}>
                        You agree to defend, indemnify, and hold harmless Victor Danger Valentine and its
                        affiliates from any claims, damages, obligations, losses, liabilities, costs, or debt,
                        and expenses (including attorney&apos;s fees) arising from your use of the App or violation
                        of these Terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Termination</h2>
                    <p className={styles.text}>
                        We may terminate or suspend your account and access to the App immediately, without
                        prior notice or liability, for any reason, including if you breach these Terms. Upon
                        termination, your right to use the App will cease immediately.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Changes to Terms</h2>
                    <p className={styles.text}>
                        We reserve the right to modify or replace these Terms at any time. If a revision is
                        material, we will provide at least 30 days notice prior to any new terms taking effect.
                        What constitutes a material change will be determined at our sole discretion.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Governing Law</h2>
                    <p className={styles.text}>
                        These Terms shall be governed by and construed in accordance with the laws of the
                        jurisdiction in which the developer operates, without regard to its conflict of law
                        provisions.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Information</h2>
                    <p className={styles.text}>
                        If you have any questions about these Terms, please contact us at:
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

