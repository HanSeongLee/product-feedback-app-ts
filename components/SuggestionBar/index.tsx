import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Select from 'components/Select';
import Container from 'components/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SORT_BY_DEFAULT_VALUE, sortParamMap } from 'lib/constants';
import SuggestionsIcon from '/public/icons/icon-suggestions.svg';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';

const useFeedback = () => {
    return useStore(
        (store) => ({
            feedbackList: store.feedbackList,
        }),
        shallow
    );
};

const SuggestionBar: React.FC = () => {
    const router = useRouter();
    const [sortBy, setSortBy] = useState(SORT_BY_DEFAULT_VALUE);
    const { feedbackList } = useFeedback();

    const handleSortBy = useCallback((newValue: string) => {
        if (newValue in sortParamMap) {
            const query = {
                ...router.query,
                sort: sortParamMap[newValue],
            };

            if (newValue === SORT_BY_DEFAULT_VALUE) {
                // @ts-ignore
                delete query.sort;
            }

            router.push(
                {
                    pathname: '/',
                    query,
                },
                undefined,
                { shallow: true }
            );
        }
    }, [router.query]);

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
                <div className={styles.leftSide}>
                    <div className={styles.title}>
                        <SuggestionsIcon className={styles.icon}
                                         title={'Suggestions'}
                        />
                        {feedbackList?.length} Suggestions
                    </div>
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
                </div>

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
