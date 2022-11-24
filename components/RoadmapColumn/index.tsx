import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
}

const RoadmapColumn: React.FC<IProps> = ({ title, description, children }) => {
    return (
        <div className={styles.roadmapColumn}>
            <div className={styles.title}>
                {title}
            </div>
            <p className={styles.description}>
                {description}
            </p>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
};

export default RoadmapColumn;
