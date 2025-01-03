'use client'

import { Box } from '@mui/material'


// Component Imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import InquiryPlnnon from './components/plnnon'
import InquiryPlnpasch from './components/plnpasch'

const Inquiry = () => {
  const product = useSelector((state: RootState) => state.inquiry.kodeproduk)?.toLowerCase()

  const MenuInquiry = () => {
    switch (product) {
      case 'plnpasch':
        return <InquiryPlnpasch />
      case 'plnnon':
        return <InquiryPlnnon />
      default:
        return <Box>No product found</Box>
    }
  }

  return <Box>{MenuInquiry()}</Box>
}

export default Inquiry
