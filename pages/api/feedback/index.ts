// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';
import { RoadmapType } from 'types/roadmap';

const prisma = new PrismaClient();

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { category, sort_by, order_by } = req.query;

    const feedbackList = await prisma.feedback.findMany({
        where: {
            category: category as string,
        },
        orderBy: sort_by === 'upvotes' && order_by ? [
            {
                [sort_by as string]: order_by as string,
            },
        ] : sort_by === 'commentCount' && order_by ? {
            comments: {
                _count: order_by as string,
            },
        } as any : undefined,
        include: {
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
    const roadmap: RoadmapType[] = statusCount.map(({ _count, status }) => {
        return {
            status,
            count: _count.status,
        }
    });

    res.status(200).json({
        items: feedbackList.map((feedback) => {
            return {
                ...feedback,
                commentCount: feedback._count.comments,
                _count: undefined,
            };
        }),
        roadmap,
    });
}

export default withSentry(handler);
