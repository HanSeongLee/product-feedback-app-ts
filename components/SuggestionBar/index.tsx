import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Select from 'components/Select';
import Container from 'components/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SORT_BY_DEFAULT_VALUE, sortParamMap } from 'lib/constants';

const SuggestionBar: React.FC = () => {
    const router = useRouter();
    const [sortBy, setSortBy] = useState(SORT_BY_DEFAULT_VALUE);

    const handleSortBy = useCallback((newValue: string) => {
        if (newValue in sortParamMap) {
            router.push(
                {
                    pathname: '/',
                    query: {
                        sort: newValue === SORT_BY_DEFAULT_VALUE ?
                            undefined : sortParamMap[newValue],
                    }
                },
                undefined,
                { shallow: true }
            );
        }
    }, []);

    useEffect(() => {
        if (!router.query?.sort) {
            setSortBy(SORT_BY_DEFAULT_VALUE);
            return ;
        }

        const sortBy = Object.keys(sortParamMap).find(key => sortParamMap[key] === router.query.sort);
        if (!sortBy) {
            return;
        }

        setSortBy(sortBy);
    }, [router.query.sort]);

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
