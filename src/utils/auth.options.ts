import axios from 'axios'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const isOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 1000
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        recaptcha: { label: 'recaptcha', type: 'text', placeholder: 'recaptcha' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.RB_URL}/api/auth`, {
            method: 'rajabiller.login_travel',
            username: credentials?.username,
            password: credentials?.password,

            // token: credentials?.recaptcha
            token: 'godModeTesting@bang'
          })

          const user = response.data

          if (user.responseCode !== '00') {
            return null
          }

          
return { ...user }
        } catch (error) {
          console.error('Error during authorization:', error)
          
return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session = { ...session, ...token }

      return session
    }
  }
} as NextAuthOptions
