// Next Imports
import Link from 'next/link'

// Util Imports
import { renderMenuIcon } from '@/@menu/utils/menuUtils'
import { getLocalizedUrl } from '@/utils/i18n'
import Menuitems from '../../vertical/menuItems'

// Type Definitions
type MenuItem = {
  id: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: React.ComponentType<any>
  href?: string
}

type DefaultSuggestionsType = {
  sectionLabel: string
  items: {
    label?: string
    href?: string
    icon?: React.ComponentType<any>
  }[]
}

// Helper Function to Convert MenuItems to Suggestions
const convertToSuggestions = (items: MenuItem[]): DefaultSuggestionsType[] =>
  items
    .filter(item => !item.navlabel && item.title && item.href)
    .reduce<DefaultSuggestionsType[]>((acc, item) => {
      const sectionLabel = item.subheader || 'Other'
      const sectionIndex = acc.findIndex(section => section.sectionLabel === sectionLabel)

      if (sectionIndex >= 0) {
        acc[sectionIndex].items.push({
          label: item.title,
          href: item.href,
          icon: item.icon
        })
      } else {
        acc.push({
          sectionLabel,
          items: [
            {
              label: item.title,
              href: item.href,
              icon: item.icon
            }
          ]
        })
      }

      return acc
    }, [])

// DefaultSuggestions Component
interface DefaultSuggestionsProps {
  setOpen: (value: boolean) => void
  searchQuery: string // Add the searchQuery prop
}

const DefaultSuggestions: React.FC<DefaultSuggestionsProps> = ({ setOpen, searchQuery }) => {
  const filteredSuggestions = searchQuery
    ? Menuitems.filter(item => item.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    : Menuitems

  const suggestions = convertToSuggestions(filteredSuggestions)

  return (
    <div className='flex mt-8 pli-8'>
      {suggestions.length > 0 ? (
        suggestions.map((section, index) => (
          <div
            key={index}
            className='flex flex-col justify-center overflow-x-hidden gap-4 basis-full sm:basis-[calc((100%-3rem)/2)]'
          >
            <p className='text-xs uppercase text-textDisabled tracking-[0.8px]'>{section.sectionLabel}</p>
            <ul className='flex flex-col gap-4'>
              {section.items.map((item, i) => (
                <li key={i} className='flex'>
                  <Link
                    href={getLocalizedUrl(item.href || '/')}
                    className='flex items-center overflow-x-hidden cursor-pointer gap-2 hover:text-primary focus-visible:text-primary focus-visible:outline-0'
                    onClick={() => setOpen(false)}
                  >
                    {item.icon &&
                      renderMenuIcon({
                        icon: item.icon,
                        level: 0,
                        active: false,
                        disabled: false,
                        styles: {},
                        isBreakpointReached: false
                      })}
                    <p className='text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis'>{item.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className='text-center text-sm text-gray-500'>No results found.</p>
      )}
    </div>
  )
}

export default DefaultSuggestions
