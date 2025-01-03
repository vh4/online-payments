'use client'

// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// Hook Imports
import { signOut } from 'next-auth/react'

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

  // Hooks

  const handleDropdownOpen = (): any => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleUserLogout = async () => {
    signOut()
  }

  return (
    <>
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
      <div className='flex items-center plb-1.5 pli-4'>
        <Button
          fullWidth
          variant='outlined'
          color='error'
          size='small'
          endIcon={<i className='ri-logout-box-r-line' />}
          onClick={handleUserLogout}
        >
          Logout
        </Button>
      </div>
    </>
  )
}

export default UserDropdown
