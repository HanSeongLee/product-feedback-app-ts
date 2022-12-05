import type { NextPage } from 'next'
import React from 'react';
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
import { signIn, useSession } from 'next-auth/react';
import cn from 'classnames';

const useFeedback = () => {
    return useStore(
        (store) => ({
            feedbackList: store.feedbackList,
            setFeedbackList: store.setFeedbackList,
            roadmapList: store.roadmapList,
            setRoadmapList: store.setRoadmapList,
        }),
        shallow
    );
};

const RoadmapPage: NextPage = () => {
    const [tabSelected, setTabSelected] = useState(0);
    const { feedbackList, setFeedbackList, roadmapList, setRoadmapList } = useFeedback();
    const { data: session } = useSession();

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

    const loadFeedbackList = async () => {
        try {
            const { data } = await axios.get(`/api/feedback`);
            setFeedbackList(data?.items);
            setRoadmapList(data?.roadmap);
        } catch (e) {
            console.error(e);
        }
    };

    const onUpvoteClick = useCallback(async (event: React.MouseEvent, feedback: FeedbackType) => {
        event.preventDefault();
        const { id, upvoted } = feedback;

        if (!session) {
            signIn();
            return ;
        }

        try {
            if (!upvoted) {
                await axios.post(`/api/feedback/${id}/upvote`);
            } else {
                await axios.delete(`/api/feedback/${id}/upvote`);
            }

            await loadFeedbackList();
        } catch (e) {
            console.error(e);
        }
    }, [session]);

    useEffect(() => {
        loadFeedbackList();
    }, []);

    return (
        <>
            <main className={styles.main}>
                <Container className={styles.navigatorWrapper}>
                    <Navigator title={'Roadmap'}
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
                <Tab className={styles.tab}
                     items={tabItems}
                     selected={tabSelected}
                     onSelectedChange={onTabChange}
                />
                <Container className={styles.container}>
                    {feedbackList && roadmapList &&
                        feedbackList.length > 0 && roadmapList.length > 0 && (
                            <>
                                {filteredRoadmap.map(({ status, count }, index) => (
                                    <RoadmapColumn className={cn({
                                        [styles.mobileHidden]: tabSelected !== index
                                    })}
                                                   title={`${status} (${count})`}
                                                   description={`${StatusDescriptionList[status]}`}
                                                   key={index}
                                    >
                                        {feedbackList
                                            .filter(({ status: _status }) => _status === status)
                                            .map((item, index) => (
                                                <Link href={`/feedback/${item.id}`}>
                                                    <a key={index}>
                                                        <FeedbackCard feedback={item}
                                                                      displayStatus
                                                                      onUpvoteClick={onUpvoteClick}
                                                        />
                                                    </a>
                                                </Link>
                                            ))
                                        }
                                    </RoadmapColumn>
                                ))}
                            </>
                            // <RoadmapColumn
                            //     title={`${filteredRoadmap[tabSelected].status} (${filteredRoadmap[tabSelected].count})`}
                            //     description={StatusDescriptionList[filteredRoadmap[tabSelected].status]}
                            // >
                            //     {feedbackList
                            //         .filter(({ status }) => status === filteredRoadmap[tabSelected].status)
                            //         .map((item, index) => (
                            //             <Link href={`/feedback/${item.id}`}>
                            //                 <a key={index}>
                            //                     <FeedbackCard feedback={item}
                            //                                   displayStatus
                            //                                   onUpvoteClick={onUpvoteClick}
                            //                     />
                            //                 </a>
                            //             </Link>
                            //         ))}
                            // </RoadmapColumn>
                        )}
                </Container>
            </main>
        </>
    );
};

export default RoadmapPage;
