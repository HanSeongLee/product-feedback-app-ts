import type { NextPage } from 'next'
import styles from './style.module.scss';
import Header from 'components/Header';
import Container from 'components/Container';
import { useRouter } from 'next/router';
import FeedbackCard from 'components/FeedbackCard';
import { useEffect, useState } from 'react';
import { FeedbackWithCommentsType } from 'types/feedback';
import axios from 'axios';
import CommentCardContainer from 'containers/CommentCardContainer';
import Navigator from 'components/Navigator';

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

        loadFeedback();
    }, [id]);

    return (
        <>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <Navigator goBackUrl={'/'}>
                        <button className={styles.editFeedbackButton}
                                type={'button'}
                        >
                            Edit Feedback
                        </button>
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
                            </>
                        )
                    }
                </Container>
            </main>
        </>
    );
}

export default Home
