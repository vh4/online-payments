'use client'

// Third-party Imports
import { SessionProvider } from 'next-auth/react'

// MUI Imports
import type { ChildrenType } from '@/@core/types'

type Props = ChildrenType

const SessionProviders = (props: Props) => {
  // Props
  const { children } = props

  return <SessionProvider>{children}</SessionProvider>
}

export default SessionProviders
