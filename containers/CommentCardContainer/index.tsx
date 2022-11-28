import React, { HTMLAttributes } from 'react';
import CommentCard from 'components/CommentCard';
import { CommentType } from 'types/feedback';

interface IProps extends HTMLAttributes<HTMLUListElement> {
    comments: CommentType[];
}

const CommentCardContainer: React.FC<IProps> = ({ comments, ...props }) => {
    return (
        <ul {...props}>
            {comments?.map((comment, index) => (
                <li key={index}>
                    <CommentCard comment={comment} />
                </li>
            ))}
        </ul>
    );
};

export default CommentCardContainer;
