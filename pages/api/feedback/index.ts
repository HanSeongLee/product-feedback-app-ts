// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const feedbackList = await prisma.feedback.findMany();
    res.status(200).json(feedbackList);
}

export default withSentry(handler);
