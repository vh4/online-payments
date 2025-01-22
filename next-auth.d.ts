// types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    username?: string // Add custom fields here
    login_date?: string
  }

  interface User {
    username?: string
    login_date?: string
  }

  interface JWT {
    username?: string
    login_date?: string
  }
}
