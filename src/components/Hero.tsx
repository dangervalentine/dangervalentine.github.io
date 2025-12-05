import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.headline}>Track Your Gaming Quest</h1>
                    <p className={styles.subheadline}>
                        The ultimate mobile companion for managing your game backlog, tracking progress,
                        and discovering what to play next.
                    </p>
                </div>
            </div>
        </section>
    );
}
