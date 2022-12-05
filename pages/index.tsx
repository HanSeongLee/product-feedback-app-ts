import type { NextPage } from 'next'
import styles from './style.module.scss';
import Header from 'components/Header';
import FeedbackCardContainer from 'containers/FeedbackCardContainer';
import Container from 'components/Container';
import SuggestionBar from 'components/SuggestionBar';

const Home: NextPage = () => {
    return (
        <>
            <main className={styles.main}>
                <Header />
                <div>
                    <SuggestionBar />
                    <Container>
                        <FeedbackCardContainer className={styles.feedbackCardContainer} />
                    </Container>
                </div>
            </main>
        </>
    );
}

export default Home
