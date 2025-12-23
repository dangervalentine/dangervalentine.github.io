import styles from './StoreButtons.module.css';
import { STORE_URLS } from '@/constants/storeUrls';
import Image from 'next/image';

export default function StoreButtons() {
    return (
        <div className={styles.container}>
            <a
                href={STORE_URLS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.button} ${styles.appStoreButton}`}
                aria-label="Download on the App Store"
            >
                <Image
                    src="/app_store.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className={styles.badge}
                />
            </a>
            <a
                href={STORE_URLS.android}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.button} ${styles.googlePlayButton}`}
                aria-label="Get it on Google Play"
            >
                <Image
                    src="/google_play_store.svg"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className={styles.badge}
                />
            </a>
        </div>
    );
}
