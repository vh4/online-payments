'use client'

// React Imports
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import { useColorScheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk'

import type { IconType } from 'react-icons/lib'

// Component Imports
import DefaultSuggestions from './DefaultSuggestions'
import NoResult from './NoResult'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Style Imports
import './styles.css'

// Data Imports
import { renderMenuIcon } from '@/@menu/utils/menuUtils'
import data from '@/data/searchData'
import { getLocalizedUrl } from '@/utils/i18n'

type Item = {
  id: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: IconType // Type for React Icons
  href?: string
}

type Section = {
  title: string
  items: Item[]
}

type SearchItemProps = {
  children: ReactNode
  shortcut?: string
  value: string
  url: string
  currentPath: string
  onSelect?: () => void
}

// Transform the data to group items by their sections
const transformedData = data.reduce((acc: Section[], item) => {
  const existingSection = acc.find(section => section.title === item.title)

  const newItem = {
    id: item.id,
    title: item.title,
    href: item.href,
    excludeLang: item.excludeLang,
    icon: item.icon
  }

  if (existingSection) {
    existingSection.items.push(newItem)
  } else {
    acc.push({ title: item.title, items: [newItem] })
  }

  return acc
}, [])

// SearchItem Component to introduce shortcut keys
const SearchItem = ({ children, shortcut, value, currentPath, url, onSelect = () => {} }: SearchItemProps) => {
  return (
    <CommandItem
      onSelect={onSelect}
      value={value}
      className={classnames({
        'active-searchItem': currentPath === url
      })}
    >
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts=''>
          {shortcut.split(' ').map(key => (
            <kbd key={key}>{key}</kbd>
          ))}
        </div>
      )}
    </CommandItem>
  )
}

// Helper function to filter and limit results per section based on the number of sections
const getFilteredResults = (sections: Section[]) => {
  const limit = sections.length > 1 ? 3 : 5

  return sections.map(section => ({
    ...section,
    items: section.items.slice(0, limit)
  }))
}

// Footer component for the search menu
const CommandFooter = () => {
  return (
    <div cmdk-footer=''>
      <div className='flex items-center gap-1'>
        <kbd>
          <i className='ri-arrow-up-line text-base' />
        </kbd>
        <kbd>
          <i className='ri-arrow-down-line text-base' />
        </kbd>
        <span>to navigate</span>
      </div>
      <div className='flex items-center gap-1'>
        <kbd>
          <i className='ri-corner-down-left-line text-base' />
        </kbd>
        <span>to open</span>
      </div>
      <div className='flex items-center gap-1'>
        <kbd>esc</kbd>
        <span>to close</span>
      </div>
    </div>
  )
}

const NavSearch = () => {
  // States
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // Hooks
  const pathName = usePathname()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()

  // When an item is selected from the search results
  const onSearchItemSelect = () => {
    setOpen(false)
  }

  // Filter the data based on the search query
  const filteredData = (sections: Section[], query: string) => {
    const searchQuery = query.trim().toLowerCase()

    return sections
      .filter(section => section.title.toLowerCase().includes(searchQuery))
      .map(section => ({
        ...section,
        items: section.items.filter(item => item?.title?.toLowerCase().includes(searchQuery) || '')
      }))
  }

  const limitedData = getFilteredResults(filteredData(transformedData, searchValue))

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  // Reset the search value when the menu is closed
  useEffect(() => {
    if (!open && searchValue !== '') {
      setSearchValue('')
    }
  }, [open])

  const { mode: muiMode, systemMode: muiSystemMode } = useColorScheme()
  const currentMode = muiMode === 'system' ? muiSystemMode : muiMode
  const isDarkMode = currentMode === 'dark'

  return (
    <>
      {isBreakpointReached || settings.layout === 'horizontal' ? (
        <IconButton className='text-textPrimary' onClick={() => setOpen(true)}>
          <i className='ri-search-line' />
        </IconButton>
      ) : (
        <div
          className={`flex items-center cursor-pointer 
        ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} 
        space-x-2 py-2 px-4 rounded-full 
        active:outline-1 active:outline-gray-300`}
          onClick={() => setOpen(true)}
        >
          <i className='ri-search-line text-[20px]' />
          <div className='whitespace-nowrap select-none text-textDisabled'>⌘K</div>
        </div>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className='flex items-center justify-between border-be pli-4 plb-3 gap-2'>
          <i className='ri-search-line' />
          <CommandInput value={searchValue} onValueChange={setSearchValue} />
          <span className='text-textDisabled'>[esc]</span>
          <i className='ri-close-line cursor-pointer' onClick={() => setOpen(false)} />
        </div>
        <CommandList>
          {searchValue ? (
            limitedData.length > 0 ? (
              limitedData.map((section, index) => (
                <CommandGroup key={index} heading={section.title.toUpperCase()} className='text-xs'>
                  {section.items.map((item, index) => (
                    <SearchItem
                      key={index}
                      currentPath={pathName}
                      url={getLocalizedUrl(item.href || '')}
                      value={item?.title || ''}
                      onSelect={() => onSearchItemSelect()}
                    >
                      {item.icon && (
                        <div className='flex text-xl'>
                          {renderMenuIcon({
                            icon: item.icon,
                            level: 0,
                            active: false,
                            disabled: false,
                            styles: {},
                            isBreakpointReached: false
                          })}
                        </div>
                      )}
                      {item.title}
                    </SearchItem>
                  ))}
                </CommandGroup>
              ))
            ) : (
              <CommandEmpty>
                <NoResult searchValue={searchValue} setOpen={setOpen} />
              </CommandEmpty>
            )
          ) : (
            <DefaultSuggestions setOpen={setOpen} searchQuery={searchValue} />
          )}
        </CommandList>

        <CommandFooter />
      </CommandDialog>
    </>
  )
}

export default NavSearch
