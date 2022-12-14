import { PrismaClient } from '@prisma/client';
import { RoadmapType } from 'types/roadmap';
import { Session } from 'next-auth';

export const getFeedbackList = async ({ prisma, category, sort_by, order_by, session }: {
    prisma: PrismaClient, category: string, sort_by: string, order_by: string,
    session: Session | null;
}) => {
    const upvotes = session ? {
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
        },
    } : false;

    const feedbackList = await prisma.feedback.findMany({
        where: {
            category: category as string,
        },
        orderBy: sort_by === 'upvotes' && order_by ? [
            {
                'upvoteCount': order_by as string,
            },
        ] : sort_by === 'commentCount' && order_by ? {
            comments: {
                _count: order_by as string,
            },
        } as any : undefined,
        include: {
            upvotes,
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });

    const statusCount = await prisma.feedback.groupBy({
        by: ['status'],
        _count: {
            status: true,
        },
    });
    const roadmap: RoadmapType[] = statusCount
        .map(({ _count, status }) => {
            return {
                status,
                count: _count.status,
            }
        });

    return {
        items: feedbackList.map((feedback) => {
            return {
                ...feedback,
                upvoted: feedback?.upvotes?.length > 0,
                upvotes: feedback.upvoteCount,
                upvoteCount: undefined,
                commentCount: feedback._count.comments,
                _count: undefined,
            };
        }),
        roadmap,
    };
};


export const makeSortQueries = (sort: string) => {
    if (!sort) {
        return {
            sort_by: 'upvotes',
            order_by: 'desc',
        };
    }

    const sortParam = String(sort).split('|');
    return sortParam.length === 0 ? {} :
        sortParam.length === 1 ? {
            sort_by: sortParam[0],
            order_by: 'asc',
        } : {
            sort_by: sortParam[0],
            order_by: sortParam[1],
        };
};
