import React, { HTMLAttributes, useEffect } from 'react';
import FeedbackCard from 'components/FeedbackCard';
import Link from 'next/link';
import axios from 'axios'
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const useFeedback = () => {
    return useStore(
        (store) => ({
            category: store.category,
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
        }),
        shallow
    );
};

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    const { category, feedbackList, setFeedbackList } = useFeedback();

    useEffect(() => {
        const loadFeedbackList = async () => {
            try {
                const { data } = await axios.get(`/api/feedback`, {
                    params: {
                        category: category === 'all' ? undefined : category,
                    },
                });
                setFeedbackList(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadFeedbackList();
    }, [category]);

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
