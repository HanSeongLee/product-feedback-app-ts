import type { GetServerSideProps, NextPage } from 'next'
import styles from './style.module.scss';
import Header from 'components/Header';
import FeedbackCardContainer from 'containers/FeedbackCardContainer';
import Container from 'components/Container';
import SuggestionBar from 'components/SuggestionBar';
import { initializeStore } from 'lib/store';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getFeedbackList, makeSortQueries } from 'lib/api/Feedback';
import { PrismaClient } from '@prisma/client';

const Home: NextPage = () => {
    return (
        <>
            <main className={styles.main}>
                <Header />
                <div>
                    <SuggestionBar />
                    <Container className={styles.container}>
                        <FeedbackCardContainer className={styles.feedbackCardContainer} />
                    </Container>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const zustandStore = initializeStore();
    const prisma = new PrismaClient();
    const { category, sort } = context.query;
    const { sort_by, order_by } = makeSortQueries(sort as string);

    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    const feedbackList = await getFeedbackList({
        prisma,
        category: category as string,
        sort_by: sort_by as string,
        order_by: order_by as string,
        session,
    });

    zustandStore.getState().setQuery(context.query);
    zustandStore.getState().setFeedbackList(feedbackList.items);
    zustandStore.getState().setRoadmapList(feedbackList.roadmap);

    return {
        props: { initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())), },
    };
};

export default Home
