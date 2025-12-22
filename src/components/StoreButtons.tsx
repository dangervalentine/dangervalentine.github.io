import styles from './StoreButtons.module.css';
import { STORE_URLS } from '@/constants/storeUrls';

export default function StoreButtons() {
    return (
        <div className={styles.container}>
            <a
                href={STORE_URLS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                aria-label="Download on the App Store"
            >
                <span className={styles.buttonText}>Download on the</span>
                <span className={styles.buttonTitle}>App Store</span>
            </a>
            <a
                href={STORE_URLS.android}
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
