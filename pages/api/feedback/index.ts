// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getFeedbackList } from 'lib/api/Feedback';

const prisma = new PrismaClient();

const get = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { category, sort_by, order_by } = req.query;

    const session = await unstable_getServerSession(req, res, authOptions);
    const feedbackList = await getFeedbackList({
        prisma,
        category: category as string,
        sort_by: sort_by as string,
        order_by: order_by as string,
        session,
    });

    return res.status(200).json(feedbackList);
};

const post = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { title, category, description } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!title || !category || !description) {
        return res.status(400).json({});
    }

    if (!session) {
        return res.status(401).json({});
    }

    const feedback = await prisma.feedback.create({
        data: {
            title,
            category,
            description,
        },
    });

    return res.status(200).json(feedback);
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        return await get(req, res);
    } else if (req.method === 'POST') {
        return await post(req, res);
    }

    return res.status(405).json({});
}

export default withSentry(handler);
