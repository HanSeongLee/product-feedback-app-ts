import React, { useCallback, useState } from 'react';
import styles from './style.module.scss';
import Select from 'components/Select';
import Container from 'components/Container';
import Link from 'next/link';

const SuggestionBar: React.FC = () => {
    const [sortBy, setSortBy] = useState('0');

    const handleSortBy = useCallback((newValue: string) => {
        setSortBy(newValue);
    }, []);

    return (
        <div className={styles.suggestionBar}>
            <Container className={styles.container}>
                <Select className={styles.select}
                        valueClassName={styles.value}
                        label={'Sort by'}
                        value={sortBy}
                        onChange={handleSortBy}
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
