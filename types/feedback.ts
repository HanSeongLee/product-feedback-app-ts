import { UserType } from 'types/user';

export type RoadmapType =
    | 'Planned'
    | 'In-Progress'
    | 'Live';

export const StatusColors: {[key: string]: string} = {
    planned: '#F49F85',
    'in-progress': '#AD1FEA',
    live: '#62BCFA',
};

export const StatusDescriptionList: {[key: string]: string} = {
    planned: 'Ideas prioritized for research',
    'in-progress': 'Currently being developed',
    live: 'Released features',
};

export type FeedbackType = {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    commentCount: number;
    upvoted?: boolean;
};

export type FeedbackWithCommentsType = FeedbackType & {
    comments: CommentType[];
};

export type CommentType = {
    id: number;
    content: string;
    user: UserType;
    replies: CommentType[];
};

export type ReplyType = Exclude<CommentType, { replies: CommentType[] }> & {
    id: number;
    content: string;
    replyingTo: UserType;
    user: UserType;
};
