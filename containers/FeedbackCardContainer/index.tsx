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
            sortBy: store.sortBy,
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
        }),
        shallow
    );
};

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    const { category, sortBy, feedbackList, setFeedbackList } = useFeedback();

    useEffect(() => {
        const makeSortQueries = () => {
            switch (sortBy) {
                case '0': {
                    return {
                        sort_by: 'upvotes',
                        order_by: 'desc',
                    };
                }
                case '1': {
                    return {
                        sort_by: 'upvotes',
                        order_by: 'asc',
                    };
                }
                case '2': {
                    return {
                        sort_by: 'commentCount',
                        order_by: 'desc',
                    };
                }
                case '3': {
                    return {
                        sort_by: 'commentCount',
                        order_by: 'asc',
                    };
                }
            }
            return {};
        };

        const loadFeedbackList = async () => {
            try {
                const { data } = await axios.get(`/api/feedback`, {
                    params: {
                        category: category === 'all' ? undefined : category,
                        ...makeSortQueries(),
                    },
                });
                setFeedbackList(data);
            } catch (e) {
                console.error(e);
            }
        };

        loadFeedbackList();
    }, [category, sortBy]);

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
