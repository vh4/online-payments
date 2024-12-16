// React Imports
import { useState } from 'react'

// MUI Imports
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { FaqType } from '@/types/pages/faqTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

type props = {
  faqData?: FaqType[]
}

const FAQ = ({ faqData }: props) => {
  // States
  const [activeTab, setActiveTab] = useState('pln')
  return faqData && faqData.length > 0 ? (
    <TabContext value={activeTab}>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={7} md={8} xl={9}>
          {faqData?.map((faq, index) => (
            <TabPanel key={index} value={faq.id} className='p-0'>
              <div className='flex items-center gap-4 mbe-4'>
                <CustomAvatar color='primary' skin='light' variant='rounded' size={50}>
                  <i className={classnames(faq.icon, 'text-3xl')} />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>{faq.title}</Typography>
                  <Typography>{faq.subtitle}</Typography>
                </div>
              </div>
              <div>
                {faq.questionsAnswers.map((items, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<i className='ri-arrow-down-s-line' />}
                      aria-controls='panel1a-content'
                    >
                      <Typography>{items.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{items.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </TabContext>
  ) : (
    <div className='flex justify-center items-center'>
      <i className='ri-error-warning-line' />
      <Typography>No results found</Typography>
    </div>
  )
}

export default FAQ
