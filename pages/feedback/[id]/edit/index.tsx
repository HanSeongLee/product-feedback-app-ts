import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import Navigator from 'components/Navigator';
import EditFeedbackFormContainer from 'containers/EditFeedbackFormContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FeedbackType } from 'types/feedback';

const FeedbackEditPage: NextPage = () => {
    const [feedback, setFeedback] = useState<FeedbackType | undefined>();
    const { query } = useRouter();
    const { id } = query;

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
                    <Navigator goBackUrl={'/'} />

                    {feedback && (
                        <EditFeedbackFormContainer feedback={feedback} />
                    )}
                </Container>
            </main>
        </>
    );
};

export default FeedbackEditPage;
