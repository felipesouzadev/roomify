import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log('ENTREI')
        const { username, password } = credentials
        const user = await prisma.users.findUnique({
          where: { username },
        });

        const passwordCorrect = await bcrypt.compare(
          password || '',
          user.password
        );

        if (passwordCorrect) {
          return {
            id: user.id,
            username: user.username,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };