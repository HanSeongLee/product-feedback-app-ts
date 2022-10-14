import React, { HTMLAttributes, useCallback } from 'react';
import CommentCard from 'components/CommentCard';
import { CommentType } from 'types/feedback';

interface IProps extends HTMLAttributes<HTMLUListElement> {
    comments: CommentType[];
}

const CommentCardContainer: React.FC<IProps> = ({ comments, ...props }) => {
    const handleReply = useCallback((event, id) => {
        // TODO: Should be implemented here!
        alert(`${id}`);
    }, []);

    return (
        <ul {...props}>
            {comments?.map((comment, index) => (
                <li key={index}>
                    <CommentCard comment={comment}
                                 onReply={handleReply}
                    />
                </li>
            ))}
        </ul>
    );
};

export default CommentCardContainer;
