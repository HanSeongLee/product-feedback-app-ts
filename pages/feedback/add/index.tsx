import type { GetServerSideProps, NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import Navigator from 'components/Navigator';
import NewFeedbackFormContainer from 'containers/NewFeedbackFormContainer';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const FeedbackAddPage: NextPage = () => {
    return (
        <>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <Navigator goBackUrl={'/'} />

                    <NewFeedbackFormContainer />
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

export default FeedbackAddPage;
