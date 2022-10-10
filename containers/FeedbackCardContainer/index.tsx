import React, { HTMLAttributes, useEffect, useState } from 'react';
import { FeedbackType } from 'types/feedback';
import FeedbackCard from 'components/FeedbackCard';
import Link from 'next/link';
import axios from 'axios'

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);

    useEffect(() => {
        const loadFeedbackList = async () => {
            try {
                const { data } = await axios.get(`/api/feedback`);
                setFeedbackList(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadFeedbackList();
    }, []);

    return (
        <div {...props}>
            {feedbackList?.map((feedback, index) => (
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
