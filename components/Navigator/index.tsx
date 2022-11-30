import React, { HTMLAttributes, useCallback } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowLeftIcon from 'public/icons/icon-arrow-left.svg';
import { useRouter } from 'next/router';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    theme?: 'light' | 'dark';
}

const Navigator: React.FC<IProps> = ({ title, theme, className, children, ...props }) => {
    const router = useRouter();

    const goBack = useCallback(() => {
        router.back();
    }, []);

    return (
        <div className={cn(styles.navigator, {
            [styles.dark]: theme === 'dark',
        }, className)}
             {...props}
        >
            <div className={styles.leftSide}>
                <button className={styles.goBackButton}
                        type={'button'}
                        onClick={goBack}
                >
                    <ArrowLeftIcon className={styles.icon} /> Go Back
                </button>
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
