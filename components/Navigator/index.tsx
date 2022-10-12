import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowLeftIcon from 'public/icons/icon-arrow-left.svg';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    goBackUrl: string;
}

const Navigator: React.FC<IProps> = ({ goBackUrl, className, children, ...props }) => {
    return (
        <div className={cn(styles.navigator, className)}
             {...props}
        >
            <div className={styles.leftSide}>
                <Link href={goBackUrl}>
                    <a className={styles.goBackButton}>
                        <ArrowLeftIcon /> Go Back
                    </a>
                </Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Navigator;
