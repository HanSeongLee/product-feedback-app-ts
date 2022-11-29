import React, { HTMLAttributes, useCallback, useEffect } from 'react';
import FeedbackCard from 'components/FeedbackCard';
import Link from 'next/link';
import axios from 'axios'
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import EmptyFeedbackBox from 'components/EmptyFeedbackBox';
import { signIn, useSession } from 'next-auth/react';
import { FeedbackType } from 'types/feedback';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const useFeedback = () => {
    return useStore(
        (store) => ({
            category: store.category,
            sortBy: store.sortBy,
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
            setRoadmapList: store.setRoadmapList,
        }),
        shallow
    );
};

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    const { category, sortBy, feedbackList, setFeedbackList, setRoadmapList } = useFeedback();
    const { data: session } = useSession();

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
            setFeedbackList(data?.items);
            setRoadmapList(data?.roadmap);
        } catch (e) {
            console.error(e);
        }
    };

    const onUpvoteClick = useCallback(async (event: React.MouseEvent, feedback: FeedbackType) => {
        event.preventDefault();
        const { id, upvoted } = feedback;

        if (!session) {
            signIn();
            return ;
        }

        try {
            if (!upvoted) {
                await axios.post(`/api/feedback/${id}/upvote`);
            } else {
                await axios.delete(`/api/feedback/${id}/upvote`);
            }

            await loadFeedbackList();
        } catch (e) {
            console.error(e);
        }
    }, [session]);

    useEffect(() => {
        loadFeedbackList();
    }, [category, sortBy]);

    return (
        <div {...props}>
            {feedbackList?.map((feedback, index) => (
                <Link href={`/feedback/${feedback.id}`}>
                    <a key={index}>
                        <FeedbackCard feedback={feedback}
                                      onUpvoteClick={onUpvoteClick}
                        />
                    </a>
                </Link>
            ))}
            {feedbackList?.length === 0 && (
                <EmptyFeedbackBox />
            )}
        </div>
    );
};

export default FeedbackCardContainer;
