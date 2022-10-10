import { PrismaClient } from '@prisma/client';
import data from '../data/data.json';

const prisma = new PrismaClient();

const load = async () => {
    try {
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
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
