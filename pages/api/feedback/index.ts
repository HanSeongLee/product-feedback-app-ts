// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { category } = req.query;

    const feedbackList = await prisma.feedback.findMany({
        where: {
            category: category as string,
        },
        include: {
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });

    res.status(200).json(feedbackList.map((feedback) => {
        return {
            ...feedback,
            commentCount: feedback._count.comments,
            _count: undefined,
        };
    }));
}

export default withSentry(handler);
