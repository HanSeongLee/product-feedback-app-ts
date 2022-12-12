import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    username: profile.login
,                };
            }
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            return session;
        },
    },
};

export default NextAuth(authOptions);
