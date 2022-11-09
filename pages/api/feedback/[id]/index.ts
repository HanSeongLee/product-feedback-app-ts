// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    const feedback = await prisma.feedback.findUnique({
        where: {
            id: Number(id as string),
        },
        include: {
            comments: {
                select: {
                    id: true,
                    content: true,
                    user: {
                        select: {
                            image: true,
                            username: true,
                            name: true,
                        },
                    },
                    replies: {
                        select: {
                            id: true,
                            content: true,
                            replyingTo: {
                                select: {
                                    username: true,
                                },
                            },
                            user: {
                                select: {
                                    image: true,
                                    username: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
                where: {
                    commentId: null,
                },
            },
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });

    res.status(200).json({
        ...feedback,
        commentCount: feedback?._count.comments,
        _count: undefined,
    });
}

export default withSentry(handler);
