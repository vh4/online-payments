'use client'

import { useRef, useState } from 'react'

// React Imports

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import { styled, useColorScheme } from '@mui/material/styles'
import { IoIosLogOut } from 'react-icons/io'

// Hook Imports
import Typography from '@mui/material/Typography'
import { signOut, useSession } from 'next-auth/react'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  const { data: session } = useSession()

  const handleDropdownOpen = (): void => {
    // Toggle the dropdown state
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleUserLogout = async (): Promise<void> => {
    await signOut({
      callbackUrl: process.env.NEXTAUTH_URL
    })
  }

  const { mode: muiMode, systemMode: muiSystemMode } = useColorScheme()
  const currentMode = muiMode === 'system' ? muiSystemMode : muiMode

  const isDarkMode = currentMode === 'dark'

  return (
    <>
      <div className='flex items-center space-x-2'>
        <div className='text-right'>
          <Typography>{session?.username}</Typography>
          <Typography variant='caption'>{session?.login_date}</Typography>
        </div>

        <Badge
          ref={anchorRef}
          overlap='circular'
          badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          className='mis-1'
        >
          <Avatar
            ref={anchorRef}
            alt='John Doe'
            src='/images/avatars/1.png'
            onClick={handleDropdownOpen}
            className='cursor-pointer bs-[38px] is-[38px]'
          />
        </Badge>

        <div
          onClick={handleUserLogout}
          className={`flex items-center px-4 bg-gray-50 ${
            isDarkMode && 'bg-gray-800'
          } py-[8px] rounded-full cursor-pointer`}
        >
          <IoIosLogOut size={20} />
        </div>
      </div>
    </>
  )
}

export default UserDropdown
