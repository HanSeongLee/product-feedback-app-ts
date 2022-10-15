import { PrismaClient } from '@prisma/client';
import data from '../data/data.json';

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.comment.deleteMany();
        console.log('Deleted records in comment table');

        await prisma.feedback.deleteMany();
        console.log('Deleted records in feedback table');

        const feedbackData = data.productRequests.map(({
                                                           id, title, category, upvotes, status,
                                                           description
                                                       }) => {
            return {
                id,
                title,
                category,
                upvotes,
                status,
                description,
            };
        });

        await prisma.feedback.createMany({
            data: feedbackData,
        });
        console.log('Added feedback data');

        await prisma.user.deleteMany();
        console.log('Deleted records in user table');

        const userData: any[] = [];
        for (let request of data.productRequests) {
            const { comments } = request;
            if (!comments) {
                continue;
            }
            for (let comment of comments) {
                const { user, replies } = comment;
                const userId = userData.length + 1;
                const existUser = userData.find(({ username }) => username === user.username);
                if (existUser) {
                    continue;
                }
                userData.push({
                    id: userId,
                    ...user,
                    image: user.image.replace('./assets/user-images', '/img/users'),
                });

                if (!replies) {
                    continue
                }

                for (let reply of replies) {
                    const { user } = reply;
                    const userId = userData.length + 1;
                    const existUser = userData.find(({ username }) => username === user.username);
                    if (existUser) {
                        continue;
                    }
                    userData.push({
                        id: userId,
                        ...user,
                        image: user.image.replace('./assets/user-images', '/img/users'),
                    });
                }
            }
        }

        await prisma.user.createMany({
            data: userData,
        });
        console.log('Added user data');

        const commentData: any[] = [];
        for (let request of data.productRequests) {
            const { id: feedbackId, comments } = request;
            if (!comments) {
                continue;
            }

            for (let comment of comments) {
                const { user: userInfo, content, replies } = comment;
                const { username } = userInfo;
                const commentId = commentData.length + 1;
                const user = await prisma.user.findUnique({
                    where: {
                        username,
                    }
                });
                if (!user) {
                    throw new Error(`User not found - ${username}`);
                }
                const { id: userId } = user;
                commentData.push({
                    id: commentId,
                    content,
                    feedbackId,
                    userId,
                });

                if (!replies) {
                    continue
                }
                for (let reply of replies) {
                    const { user: userInfo, content, replyingTo } = reply;
                    const { username } = userInfo;
                    const user = await prisma.user.findUnique({
                        where: {
                            username,
                        }
                    });
                    if (!user) {
                        throw new Error(`User not found - ${username}`);
                    }

                    const replyingToUser = await prisma.user.findUnique({
                        where: {
                            username: replyingTo,
                        }
                    });
                    if (!replyingToUser) {
                        throw new Error(`User not found - ${replyingTo}`);
                    }
                    const { id: replyingToId } = replyingToUser;

                    const { id: userId } = user;
                    commentData.push({
                        content,
                        commentId,
                        replyingToId,
                        feedbackId,
                        userId,
                    });
                }
            }
        }

        await prisma.comment.createMany({
            data: commentData,
        });
        console.log('Added comment data');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
