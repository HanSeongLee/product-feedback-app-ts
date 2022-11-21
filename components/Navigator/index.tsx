import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowLeftIcon from 'public/icons/icon-arrow-left.svg';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    goBackUrl: string;
    title?: string;
    theme?: 'light' | 'dark';
}

const Navigator: React.FC<IProps> = ({ goBackUrl, title, theme, className, children, ...props }) => {
    return (
        <div className={cn(styles.navigator, {
            [styles.dark]: theme === 'dark',
        }, className)}
             {...props}
        >
            <div className={styles.leftSide}>
                <Link href={goBackUrl}>
                    <a className={styles.goBackButton}>
                        <ArrowLeftIcon className={styles.icon} /> Go Back
                    </a>
                </Link>
                {title && (
                    <div className={styles.title}>
                        {title}
                    </div>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

Navigator.defaultProps = {
    theme: 'light',
};

export default Navigator;
