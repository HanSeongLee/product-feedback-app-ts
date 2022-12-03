import React, { HTMLAttributes, useCallback, useState } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import { CommentType, ReplyType } from 'types/feedback';
import ReplyFormContainer from 'containers/ReplyFormContainer';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    parentId?: number;
    comment: CommentType | ReplyType;
}

const CommentCard: React.FC<IProps> = ({ parentId, comment, className, ...props }) => {
    // @ts-ignore
    const { id, content, user, replyingTo, replies } = comment;
    const { image, username, name } = user;
    const [openReply, setOpenReply] = useState(false);

    const toggleReply = useCallback(() => {
        setOpenReply(state => !state);
    }, []);

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
                        {name}
                    </div>
                    <div className={styles.username}>
                        @{username}
                    </div>
                </div>
                <button className={styles.replyButton}
                        type={'button'}
                        onClick={toggleReply}
                >
                    Reply
                </button>
            </div>
            <p className={cn(styles.content, {
                [styles.hasReplies]: replies?.length > 0,
            })}>
                {replyingTo && (
                    <>
                        <span className={styles.replyingTo}>
                            @{replyingTo?.username}
                        </span>&nbsp;
                    </>
                )}
                {content}
            </p>
            {openReply && (
                <div className={styles.replyFormWrapper}>
                    <ReplyFormContainer commentId={parentId ? parentId : id}
                                        replyingTo={username}
                                        onSubmitAfter={toggleReply}
                    />
                </div>
            )}
            {replies?.length > 0 && (
                <ul className={styles.replyContainer}>
                    {replies.map((reply, index) => (
                        <li key={index}>
                            <CommentCard parentId={id}
                                         comment={reply}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentCard;
