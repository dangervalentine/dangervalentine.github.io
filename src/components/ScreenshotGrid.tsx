import Image from 'next/image';
import styles from './ScreenshotGrid.module.css';

interface ScreenshotGridProps {
    screenshots?: string[];
}

export default function ScreenshotGrid({ screenshots = [] }: ScreenshotGridProps) {
    const defaultScreenshots = [
        '/images/screenshot-1.png',
        '/images/screenshot-2.png',
        '/images/screenshot-3.png',
        '/images/screenshot-4.png',
    ];

    const images = screenshots.length > 0 ? screenshots : defaultScreenshots;

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {images.map((src, index) => (
                    <div key={index} className={styles.screenshot}>
                        <Image
                            src={src}
                            alt={`NextQuest screenshot ${index + 1}`}
                            width={300}
                            height={533}
                            className={styles.image}
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
