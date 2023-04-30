import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from 'bcrypt'
import { prisma } from "@/lib/prismadb"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {

                const { username, password } = credentials

                if (!username || !password) {
                    throw new Error('Username and password required')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                })

                if (!user) {
                    throw new Error('User does not exist');
                }

                user.password = await hash(user.password, 12)

                const isCorrectPassword = await compare(password, user.password)
                if (!isCorrectPassword) {
                    throw new Error('Incorrect password')
                }
                
                return user
            }
        })
    ],
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async session({ session, token }) {
            const user = await prisma.user.findUnique({where:{id: token.sub}})
            delete user.password
            session.user = user
            return session
        }
    },
    debug: process.env.NODE_ENV !== "production",
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }