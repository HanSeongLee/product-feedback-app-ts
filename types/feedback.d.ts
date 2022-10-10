export type RoadmapType =
    | 'Planned'
    | 'In-Progress'
    | 'Live';

export type FeedbackType = {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    commentCount: number;
};
