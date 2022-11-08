import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import { useRouter } from 'next/router';
import FeedbackCard from 'components/FeedbackCard';
import { useEffect, useState } from 'react';
import { FeedbackWithCommentsType } from 'types/feedback';
import axios from 'axios';
import CommentCardContainer from 'containers/CommentCardContainer';
import Navigator from 'components/Navigator';
import AddCommentFormContainer from 'containers/AddCommentFormContainer';
import Link from 'next/link';

const Home: NextPage = () => {
    const { query } = useRouter();
    const { id } = query;
    const [feedback, setFeedback] = useState<FeedbackWithCommentsType | undefined>();

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const { data } = await axios.get(`/api/feedback/${id}`);
                setFeedback(data);
            } catch (e) {
                console.error(e);
            }
        }

        if (!id) {
            return;
        }

        loadFeedback();
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