import { ReactNode } from 'react';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className={styles.card}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
}

