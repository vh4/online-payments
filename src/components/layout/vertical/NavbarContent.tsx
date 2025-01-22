'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import NavToggle from './NavToggle'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import NavSearch from '../shared/search'

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between is-full')}>
      <div className='flex items-center'>
        <ModeDropdown />
        <NavSearch />
        <NavToggle />
      </div>
      <div className='flex items-center'>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
