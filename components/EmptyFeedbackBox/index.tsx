import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import cn from 'classnames';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const EmptyFeedbackBox: React.FC<IProps> = ({ className, ...props }) => {
    return (
        <div className={cn(styles.emptyFeedbackBox, className)}
             {...props}
        >
            <img className={styles.illustration}
                 src={'/img/suggestions/illustration-empty.svg'}
                 alt={''}
            />
            <h2 className={styles.title}>
                There is no feedback yet.
            </h2>
            <p className={styles.description}>
                Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our
                app.
            </p>
            <Link href={'/feedback/add'}>
                <a className={styles.addFeedbackButton}>
                    + Add Feedback
                </a>
            </Link>
        </div>
    );
};

export default EmptyFeedbackBox;
