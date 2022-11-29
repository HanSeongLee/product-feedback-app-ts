// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const prisma = new PrismaClient();

const post = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({});
    }

    const feedbackId: number = Number(id);
    const { user: { id: userId } } = session;

    await prisma.feedbackUpvote.create({
        data: {
            feedback: {
                connect: {
                    id: feedbackId,
                },
            },
            voteBy: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    await prisma.feedback.update({
        where: {
            id: feedbackId,
        },
        data: {
            upvoteCount: {
                increment: 1,
            },
        },
    });

    return res.status(200).json({});
};

const _delete = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({});
    }

    const feedbackId: number = Number(id);
    const { user: { id: userId } } = session;

    if (!userId) {
        return res.status(401).json({});
    }

    await prisma.feedbackUpvote.delete({
        where: {
            userId_feedbackId: {
                userId,
                feedbackId,
            },
        },
    });

    await prisma.feedback.update({
        where: {
            id: feedbackId,
        },
        data: {
            upvoteCount: {
                decrement: 1,
            },
        },
    });

    return res.status(200).json({});
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        return await post(req, res);
    } else if (req.method === 'DELETE') {
        return await _delete(req, res);
    }

    return res.status(405).json({});
}

export default withSentry(handler);
