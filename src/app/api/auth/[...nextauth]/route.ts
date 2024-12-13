import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.RB_URL}/json.php`, {
            method: "rajabiller.login_travel",
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = response.data;
          if (user.responseCode !== '00') {
            return null; 
          }
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      session.user = token as any; 
      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
