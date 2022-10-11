import { UserType } from 'types/user';

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
