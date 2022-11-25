import type { NextPage } from 'next'
import styles from './style.module.scss';
import Container from 'components/Container';
import Navigator from 'components/Navigator';
import Link from 'next/link';
import FeedbackCard from 'components/FeedbackCard';
import { FeedbackType, StatusColors, StatusDescriptionList } from 'types/feedback';
import Tab from 'components/Tab';
import { useCallback, useEffect, useMemo, useState } from 'react';
import RoadmapColumn from 'components/RoadmapColumn';
import { useStore } from 'lib/store';
import shallow from 'zustand/shallow';
import axios from 'axios';

const useFeedback = () => {
    return useStore(
        (store) => ({
            category: store.category,
            sortBy: store.sortBy,
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
            roadmapList: store.roadmapList,
            setRoadmapList: store.setRoadmapList,
        }),
        shallow
    );
};

const RoadmapPage: NextPage = () => {
    const feedbackItem: FeedbackType = {
        "id": 9,
        "title": "One-click portfolio generation",
        "category": "feature",
        "upvotes": 62,
        "status": "in-progress",
        "description": "Add ability to create professional looking portfolio from profile.",
        "commentCount": 1
    };
    const [tabSelected, setTabSelected] = useState(0);
    const { feedbackList, setFeedbackList, roadmapList, setRoadmapList } = useFeedback();

    const onTabChange = useCallback((index: number) => {
        setTabSelected(index);
    }, []);

    const filteredRoadmap = useMemo(() => {
        return roadmapList?.filter(({ status }) => status != 'suggestion');
    }, [roadmapList]);

    const tabItems = useMemo(() => {
        return filteredRoadmap?.map(({status, count}) => {
            return {
                name: `${status} (${count})`,
                borderColor: StatusColors[status],
            };
        });
    }, [filteredRoadmap]);

    useEffect(() => {
        const loadFeedbackList = async () => {
            try {
                const { data } = await axios.get(`/api/feedback`);
                setFeedbackList(data?.items);
                setRoadmapList(data?.roadmap);
            } catch (e) {
                console.error(e);
            }
        };

        loadFeedbackList();
    }, []);

    return (
        <>
            <main className={styles.main}>
                <Container className={styles.navigatorWrapper}>
                    <Navigator goBackUrl={'/'}
                               title={'Roadmap'}
                               theme={'dark'}
                    >
                        <Link href={`/feedback/add`}>
                            <a className={styles.addFeedbackButton}
                               type={'button'}
                            >
                                + Add Feedback
                            </a>
                        </Link>
                    </Navigator>
                </Container>
                <Tab items={tabItems}
                     selected={tabSelected}
                     onSelectedChange={onTabChange}
                />
                <Container className={styles.container}>
                    {feedbackList && roadmapList &&
                        feedbackList.length > 0 && roadmapList.length > 0 && (
                            <RoadmapColumn
                                title={`${filteredRoadmap[tabSelected].status} (${filteredRoadmap[tabSelected].count})`}
                                description={StatusDescriptionList[filteredRoadmap[tabSelected].status]}
                            >
                                {feedbackList
                                    .filter(({ status }) => status === filteredRoadmap[tabSelected].status)
                                    .map((item, index) => (
                                        <Link href={`/feedback/${item.id}`}>
                                            <a key={index}>
                                                <FeedbackCard feedback={item}
                                                              displayStatus
                                                />
                                            </a>
                                        </Link>
                                    ))}
                            </RoadmapColumn>
                        )}
                </Container>
            </main>
        </>
    );
};

export default RoadmapPage;
