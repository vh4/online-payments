import NextAuth from 'next-auth'

import { isOptions } from '@/utils/auth.options'

const handler = NextAuth(isOptions)

export { handler as GET, handler as POST }
