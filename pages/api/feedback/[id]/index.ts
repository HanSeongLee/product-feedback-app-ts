// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const prisma = new PrismaClient();

const get = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;

    const session = await unstable_getServerSession(req, res, authOptions);

    const upvotes = session ? {
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
        },
    } : false;

    const feedback = await prisma.feedback.findUnique({
        where: {
            id: Number(id as string),
        },
        include: {
            upvotes,
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

    return res.status(200).json({
        ...feedback,
        upvoted: feedback?.upvotes && feedback.upvotes.length > 0,
        upvotes: feedback?.upvoteCount,
        upvoteCount: undefined,
        commentCount: feedback?._count.comments,
        _count: undefined,
    });
};

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;
    const { title, category, description, status } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!title || !category || !description || !status) {
        return res.status(400).json({});
    }

    if (!session) {
        return res.status(401).json({});
    }

    const feedback = await prisma.feedback.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            category,
            description,
            status,
        },
    });

    return res.status(200).json(feedback);
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

    const feedback = await prisma.feedback.delete({
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

    return res.status(200).json({
        ...feedback,
        commentCount: feedback?._count.comments,
        _count: undefined,
    });
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        return await get(req, res);
    } else if (req.method === 'PATCH') {
        return await patch(req, res);
    } else if (req.method === 'DELETE') {
        return await _delete(req, res);
    }

    return res.status(405).json({});
}

export default withSentry(handler);
