'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { FaqType } from '@/types/pages/faqTypes'

// Component Imports
import Faqs from './Faq'

const FAQ = ({ data }: { data?: FaqType[] }) => {
  return (
    <Grid container spacing={6} sx={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Faqs faqData={data} />
      </Grid>
    </Grid>
  )
}

export default FAQ
