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
    const { comment: content } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!content) {
        return res.status(400).json({
            message: 'Required comment',
        });
    }

    if (!session) {
        return res.status(401).json({});
    }

    const feedbackId: number = Number(id);
    const { user: { id: userId } } = session;

    await prisma.comment.create({
        data: {
            content,
            feedback: {
                connect: {
                    id: feedbackId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
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
    }

    return res.status(405).json({});
}

export default withSentry(handler);
