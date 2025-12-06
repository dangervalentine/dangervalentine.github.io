import styles from './StoreButtons.module.css';

export default function StoreButtons() {
    return (
        <div className={styles.container}>
            <a
                href="https://apps.apple.com/app/nextquest"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Download on the App Store"
            >
                <span className={styles.buttonText}>Download on the</span>
                <span className={styles.buttonTitle}>App Store</span>
            </a>
            <a
                href="https://play.google.com/store/apps/details?id=com.nextquest"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Get it on Google Play"
            >
                <span className={styles.buttonText}>Get it on</span>
                <span className={styles.buttonTitle}>Google Play</span>
            </a>
        </div>
    );
}

