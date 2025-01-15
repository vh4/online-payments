'use client'

import { Box } from '@mui/material'

// Component Imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import PaymentPlnnon from './components/plnnon'
import PaymentPlnpasch from './components/plnpasch'
import PaymentPlnPrepaid from './components/prepaid'

const Payment = () => {
  let products = useSelector((state: RootState) => state.payment.kodeproduk)?.toLowerCase()

  const MenuPayment = () => {
    if (products.substring(0, 6) === 'plnpra') {
      products = 'plnprah'
    } else if (products.substring(0, 6) === 'plnnon') {
      products = 'plnnonh'
    }

    switch (products) {
      case 'plnpasch':
        return <PaymentPlnpasch />
      case 'plnnonh':
        return <PaymentPlnnon />
      case 'plnprah':
        return <PaymentPlnPrepaid />
      default:
        return <Box>No product found</Box>
    }
  }

  return <Box>{MenuPayment()}</Box>
}

export default Payment
