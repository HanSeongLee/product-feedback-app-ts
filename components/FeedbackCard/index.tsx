import React, { HTMLAttributes, MouseEventHandler } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { FeedbackType } from 'types/feedback';
import ArrowUpIcon from 'public/icons/icon-arrow-up.svg';
import CommentsIcon from 'public/icons/icon-comments.svg';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    feedback: FeedbackType;
    onUpvoteClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const FeedbackCard: React.FC<IProps> = ({ feedback, onUpvoteClick, className, ...props }) => {
    const {
        title, description, category, upvotes,
        commentCount
    } = feedback;

    return (
        <div className={cn(styles.feedbackCard, className)}
             {...props}
        >
            <div className={styles.title}>
                {title}
            </div>
            <p className={styles.description}>
                {description}
            </p>
            <div className={styles.categoryContainer}>
                <span className={styles.category}>
                    {category}
                </span>
            </div>
            <div className={styles.footer}>
                <button className={styles.upvoteButton}
                        type={'button'}
                        onClick={onUpvoteClick}
                >
                    <ArrowUpIcon className={styles.icon} />
                    {upvotes}
                </button>
                <div className={styles.commentCountContainer}>
                    <CommentsIcon />
                    <div className={styles.commentCount}>
                        {commentCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;
