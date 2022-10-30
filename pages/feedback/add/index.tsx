import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import Navigator from 'components/Navigator';
import NewFeedbackFormContainer from 'containers/NewFeedbackFormContainer';

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

export default FeedbackAddPage;
