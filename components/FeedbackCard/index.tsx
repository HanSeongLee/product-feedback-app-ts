import React, { CSSProperties, HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { FeedbackType, StatusColors } from 'types/feedback';
import ArrowUpIcon from 'public/icons/icon-arrow-up.svg';
import CommentsIcon from 'public/icons/icon-comments.svg';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    feedback: FeedbackType;
    displayStatus?: boolean;
    onUpvoteClick?: (event: React.MouseEvent, feedback: FeedbackType) => void;
}

const FeedbackCard: React.FC<IProps> = ({ feedback, displayStatus, onUpvoteClick, className, ...props }) => {
    const {
        title, description, category, upvoted,
        upvotes, status, commentCount
    } = feedback;

    return (
        <div className={cn(styles.feedbackCard, {
            [styles.displayStatus]: displayStatus,
        }, className)}
             style={{
                 '--status-color': StatusColors[status],
             } as CSSProperties}
             {...props}
        >
            <div className={styles.status}>
                {status.replace('-', ' ')}
            </div>
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
                <button className={cn(styles.upvoteButton, {
                    [styles.active]: upvoted,
                })}
                        type={'button'}
                        onClick={(e) => {
                            if (onUpvoteClick) {
                                onUpvoteClick(e, feedback);
                            }
                        }}
                >
                    <ArrowUpIcon className={styles.icon} />
                    {upvotes}
                </button>
                <div className={styles.commentCountContainer}>
                    <CommentsIcon />
                    <div className={cn(styles.commentCount, {
                        [styles.zero]: commentCount === 0,
                    })}>
                        {commentCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

FeedbackCard.defaultProps = {
    displayStatus: false,
};

export default FeedbackCard;
