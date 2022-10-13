import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { CommentType, ReplyType } from 'types/feedback';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    comment: CommentType | ReplyType;
    onReply: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

const CommentCard: React.FC<IProps> = ({ comment, onReply, className, ...props }) => {
    // @ts-ignore
    const { id, content, user, replyingTo, replies } = comment;
    const { image, username, name } = user;

    return (
        <div className={cn(styles.commentCard, className)}
             {...props}
        >
            <div className={styles.header}>
                <img className={styles.avatar}
                     src={image}
                     alt={''}
                />
                <div className={styles.userInfoContainer}>
                    <div className={styles.name}>
                        {username}
                    </div>
                    <div className={styles.username}>
                        @{name}
                    </div>
                </div>
                <button className={styles.replyButton}
                        type={'button'}
                        onClick={(e) => onReply(e, id)}
                >
                    Reply
                </button>
            </div>
            <p className={styles.content}>
                {replyingTo && (
                    <>
                        <span className={styles.replyingTo}>
                            @{replyingTo?.username}
                        </span>&nbsp;
                    </>
                )}
                {content}
            </p>
            {replies?.length > 0 && (
                <ul className={styles.replyContainer}>
                    {replies.map((reply, index) => (
                        <li key={index}>
                            <CommentCard comment={reply}
                                         onReply={(e) => onReply(e, reply.id)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentCard;
