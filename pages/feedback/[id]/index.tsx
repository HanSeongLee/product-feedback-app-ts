import type { NextPage } from 'next'
import React from 'react';
import styles from './style.module.scss';
import Container from 'components/Container';
import { useRouter } from 'next/router';
import FeedbackCard from 'components/FeedbackCard';
import { useCallback, useEffect, useRef } from 'react';
import CommentCardContainer from 'containers/CommentCardContainer';
import Navigator from 'components/Navigator';
import AddCommentFormContainer from 'containers/AddCommentFormContainer';
import Link from 'next/link';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import { FeedbackType } from 'types/feedback';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';

const useFeedbackDetailList = () => {
    return useStore(
        (store) => ({
            feedbackDetailList: store.feedbackDetailList,
            loadFeedback: store.loadFeedback,
        }),
        shallow
    );
};

const Home: NextPage = () => {
    const { query } = useRouter();
    const { id } = query;
    const { feedbackDetailList, loadFeedback } = useFeedbackDetailList();
    const feedback = id && id as string in feedbackDetailList ? feedbackDetailList[id as string] : null;
    const dataFetchedRef = useRef(false);
    const { data: session } = useSession();

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

            await loadFeedback(String(id));
        } catch (e) {
            console.error(e);
        }
    }, [session]);

    useEffect(() => {
        if (!id || dataFetchedRef.current) {
            return;
        }
        dataFetchedRef.current = true;

        loadFeedback(id as string);
    }, [id]);

    return (
        <>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <Navigator >
                        <Link href={`/feedback/${id}/edit`}>
                            <a className={styles.editFeedbackButton}
                               type={'button'}
                            >
                                Edit Feedback
                            </a>
                        </Link>
                    </Navigator>
                    {feedback &&
                        (
                            <>
                                <FeedbackCard feedback={feedback}
                                              onUpvoteClick={onUpvoteClick}
                                />
                                {feedback.commentCount > 0 && (
                                    <div className={styles.commentListBox}>
                                        <div className={styles.title}>
                                            {feedback.commentCount} Comments
                                        </div>
                                        <CommentCardContainer className={styles.commentCardContainer}
                                                              comments={feedback.comments}
                                        />
                                    </div>
                                )}
                                <div className={styles.commentListBox}>
                                    <div className={styles.title}>
                                        Add Comment
                                    </div>
                                    <AddCommentFormContainer />
                                </div>
                            </>
                        )
                    }
                </Container>
            </main>
        </>
    );
}

export default Home
