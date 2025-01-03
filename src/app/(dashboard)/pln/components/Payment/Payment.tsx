'use client'

import { Box } from '@mui/material'


// Component Imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import PaymentPlnnon from './components/plnnon'
import PaymentPlnpasch from './components/plnpasch'

const Payment = () => {
  const product = useSelector((state: RootState) => state.payment.kodeproduk)?.toLowerCase()

  const MenuPayment = () => {
    switch (product) {
      case 'plnpasch':
        return <PaymentPlnpasch />
      case 'plnnon':
        return <PaymentPlnnon />
      default:
        return <Box>No product found</Box>
    }
  }

  return <Box>{MenuPayment()}</Box>
}

export default Payment
