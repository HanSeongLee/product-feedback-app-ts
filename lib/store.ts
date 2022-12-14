import { useLayoutEffect } from 'react';
import create, { UseBoundStore } from 'zustand';
import createContext from 'zustand/context';
import { combine } from 'zustand/middleware';
import { FeedbackType, FeedbackWithCommentsType } from 'types/feedback';
import { RoadmapType } from 'types/roadmap';
import axios from 'axios';

let store: any;

type InitialState = ReturnType<typeof getDefaultInitialState>;
type UseStoreState = typeof initializeStore extends (
        ...args: never
    ) => UseBoundStore<infer T>
    ? T
    : never;

const getDefaultInitialState = () => ({
    feedbackList: [] as FeedbackType[],
    roadmapList: [] as RoadmapType[],
    menuOpen: false,
    feedbackDetailList: {} as {[key: string]: FeedbackWithCommentsType},
    query: {},
});

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
    return create(
        combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
            setFeedbackList: (feedbackList: FeedbackType[]) => {
                set({ feedbackList, });
            },
            setRoadmapList: (roadmapList: RoadmapType[]) => {
                set({ roadmapList, });
            },
            setMenuOpen: (open: boolean) => {
                set({ menuOpen: open, });
            },
            setFeedbackDetailList: (feedbackDetailList: {}) => {
                set({ feedbackDetailList, });
            },
            loadFeedback: async (id: string) => {
                try {
                    const { data } = await axios.get(`/api/feedback/${id}`);
                    set((state) => ({
                        feedbackDetailList: {
                            ...state.feedbackDetailList,
                            [data?.id]: data,
                        },
                    }));
                } catch (e) {
                    console.error(e);
                }
            },
            setQuery: (query: object) => {
                set({ query, });
            },
        }))
    );
};

export const useCreateStore = (serverInitialState: InitialState) => {
    // For SSR & SSG, always use a new store.
    if (typeof window === "undefined") {
        return () => initializeStore(serverInitialState);
    }

    const isReusingStore = Boolean(store);
    // For CSR, always re-use same store.
    store = store ?? initializeStore(serverInitialState);
    // And if initialState changes, then merge states in the next render cycle.
    //
    // eslint complaining "React Hooks must be called in the exact same order in every component render"
    // is ignorable as this code runs in same order in a given environment
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
        // states on CSR page navigation or not. I have chosen not to, but if you choose to,
        // then add `serverInitialState = getDefaultInitialState()` here.
        if (serverInitialState && isReusingStore) {
            store.setState(
                {
                    // re-use functions from existing store
                    ...store.getState(),
                    // but reset all other properties.
                    // ...serverInitialState,
                },
                true // replace states, rather than shallow merging
            );
        }
    });

    return () => store;
};
