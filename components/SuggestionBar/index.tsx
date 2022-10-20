import React from 'react';
import styles from './style.module.scss';
import Select from 'components/Select';
import Container from 'components/Container';
import Link from 'next/link';

const SuggestionBar: React.FC = () => {
    return (
        <div className={styles.suggestionBar}>
            <Container className={styles.container}>
                <Select label={'Sort by'}
                        options={[
                            {
                                label: 'Most Upvotes',
                                value: '0',
                            },
                            {
                                label: 'Least Upvotes',
                                value: '1',
                            },
                            {
                                label: 'Most Comments',
                                value: '2',
                            },
                            {
                                label: 'Least Comments',
                                value: '3',
                            },
                        ]}
                />

                <Link href={'/feedback/add'}>
                    <a className={styles.addFeedbackButton}>
                        + Add Feedback
                    </a>
                </Link>
            </Container>
        </div>
    );
};

export default SuggestionBar;
