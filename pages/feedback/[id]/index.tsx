import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import { useRouter } from 'next/router';
import FeedbackCard from 'components/FeedbackCard';
import { useEffect, useRef } from 'react';
import CommentCardContainer from 'containers/CommentCardContainer';
import Navigator from 'components/Navigator';
import AddCommentFormContainer from 'containers/AddCommentFormContainer';
import Link from 'next/link';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

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
                    <Navigator goBackUrl={'/'}>
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
                                <FeedbackCard feedback={feedback} />
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
