import { IconLayoutDashboard } from '@tabler/icons-react'

import { uniqueId } from 'lodash'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { LiaWalletSolid } from 'react-icons/lia'
import { MdBroadcastOnHome, MdLiveTv, MdOutlineWaterDrop, MdPhonelinkRing, MdSpeakerPhone } from 'react-icons/md'
import { PiHospital, PiMoney } from 'react-icons/pi'
import { RiShieldCrossLine } from 'react-icons/ri'

import type { IconType } from 'react-icons/lib'

export interface MenuItem {
  id: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: IconType // Type for React Icons
  href?: string
}

const Menuitems = [
  {
    id: uniqueId(),
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
    id: uniqueId(),
    navlabel: true,
    subheader: 'TAGIHAN'
  },
  {
    id: uniqueId(),
    title: 'PLN',
    icon: AiOutlineThunderbolt,
    href: '/pln'
  },
  {
    id: uniqueId(),
    title: 'PDAM',
    icon: MdOutlineWaterDrop,
    href: '/pdam'
  },
  {
    id: uniqueId(),
    title: 'Multifinance',
    icon: PiMoney,
    href: '/multifinance'
  },
  {
    id: uniqueId(),
    title: 'Internet & TV Kabel',
    icon: MdLiveTv,
    href: '/tv-kabel'
  },
  {
    id: uniqueId(),
    navlabel: true,
    subheader: 'ISI ULANG'
  },
  {
    id: uniqueId(),
    title: 'E-wallet',
    icon: LiaWalletSolid,
    href: '/e-wallet'
  },
  {
    id: uniqueId(),
    title: 'Pulsa',
    icon: MdPhonelinkRing,
    href: '/pulsa'
  },
  {
    id: uniqueId(),
    title: 'Paket Data',
    icon: MdSpeakerPhone,
    href: '/paket-data'
  },
  {
    id: uniqueId(),
    title: 'Telkom',
    icon: MdBroadcastOnHome,
    href: '/telkom'
  },
  {
    id: uniqueId(),
    navlabel: true,
    subheader: 'Asuransi'
  },
  {
    id: uniqueId(),
    title: 'BPJS',
    icon: PiHospital,
    href: '/bpjs'
  },
  {
    id: uniqueId(),
    title: 'Asuransi',
    icon: RiShieldCrossLine,
    href: '/asuransi'
  }
]

export default Menuitems
