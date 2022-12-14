import React, { HTMLAttributes, useCallback, useEffect } from 'react';
import FeedbackCard from 'components/FeedbackCard';
import Link from 'next/link';
import axios from 'axios'
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import EmptyFeedbackBox from 'components/EmptyFeedbackBox';
import { signIn, useSession } from 'next-auth/react';
import { FeedbackType } from 'types/feedback';
import { useRouter } from 'next/router';
import { makeSortQueries } from 'lib/api/Feedback';

interface IProps extends HTMLAttributes<HTMLDivElement> {

}

const useFeedback = () => {
    return useStore(
        (store) => ({
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
            setRoadmapList: store.setRoadmapList,
            query: store.query,
            setQuery: store.setQuery,
        }),
        shallow
    );
};

const FeedbackCardContainer: React.FC<IProps> = ({ ...props }) => {
    const router = useRouter();
    const {
        feedbackList, setFeedbackList, setRoadmapList, query,
        setQuery,
    } = useFeedback();
    const { data: session } = useSession();

    const loadFeedbackList = async () => {
        try {
            const { data } = await axios.get(`/api/feedback`, {
                params: {
                    category: router.query.category,
                    ...makeSortQueries(router.query?.sort as string),
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
    }, [session, router.query.category, router.query.sort]);

    useEffect(() => {
        if (JSON.stringify(router.query) === JSON.stringify(query)) {
            return;
        }

        loadFeedbackList();
        setQuery(router.query);
    }, [query, router.query.category, router.query.sort]);

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
