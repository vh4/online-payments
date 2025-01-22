import { IconLayoutDashboard } from '@tabler/icons-react'

import { uniqueId } from 'lodash'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { LiaWalletSolid } from 'react-icons/lia'
import { MdBroadcastOnHome, MdOutlineWaterDrop, MdPhonelinkRing, MdSpeakerPhone } from 'react-icons/md'
import { PiHospital, PiMoney } from 'react-icons/pi'
import { RiShieldCrossLine } from 'react-icons/ri'

import type { IconType } from 'react-icons/lib'

type SearchData = {
  id: string
  title: string
  href: string
  excludeLang?: boolean
  icon: IconType | any
}

const data: SearchData[] = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/home'
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

export default data
