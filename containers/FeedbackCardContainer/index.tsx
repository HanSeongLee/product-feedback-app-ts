import React, { HTMLAttributes } from 'react';
import { FeedbackType } from 'types/feedback';
import FeedbackCard from 'components/FeedbackCard';
import Link from 'next/link';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const feedbacks: FeedbackType[] = [
    {
        id: 1,
        title: 'Add tags for solutions',
        category: 'enhancement',
        upvotes: 112,
        status: 'suggestion',
        description: 'Easier to search for solutions based on a specific stack.',
        commentCount: 2,
    },
];

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    return (
        <div {...props}>
            {feedbacks?.map((feedback, index) => (
                <Link href={`/feedback/${feedback.id}`}>
                    <a key={index}>
                        <FeedbackCard feedback={feedback} />
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default FeedbackCardContainer;
