// Next Imports
import Link from 'next/link'

import { uniqueId } from 'lodash'

// Third-party Imports
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { MdOutlineWaterDrop } from 'react-icons/md'

// Type Imports

// Util Imports
import { renderMenuIcon } from '@/@menu/utils/menuUtils'
import { getLocalizedUrl } from '@/utils/i18n'

const noResultData = [
  {
    id: uniqueId(),
    title: 'Tagihan PLN',
    icon: AiOutlineThunderbolt,
    href: '/pln'
  },
  {
    id: uniqueId(),
    title: 'Tagihan PDAM',
    icon: MdOutlineWaterDrop,
    href: '/pdam'
  }
]

const NoResult = ({ searchValue, setOpen }: { searchValue: string; setOpen: (value: boolean) => void }) => {
  // Hooks

  return (
    <div className='flex items-center justify-center grow flex-wrap plb-14 pli-16 overflow-y-auto overflow-x-hidden bs-full'>
      <div className='flex flex-col items-center'>
        <i className='ri-file-forbid-line text-[64px] mbe-2.5' />
        <p className='text-xl mbe-11'>{`No result for "${searchValue}"`}</p>
        <p className='mbe-[18px] text-textDisabled'>Try searching for...</p>
        <ul className='flex flex-col gap-4'>
          {noResultData.map((item, index) => (
            <li key={index} className='flex items-center'>
              <Link
                href={getLocalizedUrl(item.href)}
                className='flex items-center gap-2 hover:text-primary focus-visible:text-primary focus-visible:outline-0'
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
                <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NoResult
