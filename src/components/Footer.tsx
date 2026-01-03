import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.links}>
                        <Link href="/support" className={styles.link}>Support</Link>
                        <Link href="/privacy" className={styles.link}>Privacy</Link>
                        <Link href="/terms" className={styles.link}>Terms</Link>
                        <a
                            href="https://github.com/dangervalentine/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:support@nextquest.dev

"
                            className={styles.link}
                        >
                            Email
                        </a>
                    </div>

                    <div className={styles.info}>
                        <p className={styles.copyright}>
                            © {currentYear} Victor Danger Valentine
                        </p>
                        <p className={styles.rights}>All Rights Reserved</p>
                        <p className={styles.version}>NextQuest v1.3.3</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
