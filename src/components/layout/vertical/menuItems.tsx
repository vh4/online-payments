import { IconLayoutDashboard } from '@tabler/icons-react'

import { uniqueId } from 'lodash'
import { AiOutlineThunderbolt } from 'react-icons/ai'

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home'
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/home'
  },
  {
    navlabel: true,
    subheader: 'MENU'
  },
  {
    id: uniqueId(),
    title: 'PLN',
    icon: AiOutlineThunderbolt,
    href: '/pln'
  }
]

export default Menuitems
