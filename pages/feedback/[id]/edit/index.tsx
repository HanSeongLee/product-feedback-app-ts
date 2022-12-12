import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import Navigator from 'components/Navigator';
import EditFeedbackFormContainer from 'containers/EditFeedbackFormContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FeedbackType } from 'types/feedback';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

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
                    <Navigator />

                    {feedback && (
                        <EditFeedbackFormContainer feedback={feedback} />
                    )}
                </Container>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: `/auth/signin?callbackUrl=${context.resolvedUrl}`,
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
}

export default FeedbackEditPage;
