'use client'

import { useState } from 'react'

import { Box, CircularProgress, Grid, TextField, Typography, useTheme } from '@mui/material'

import Button from '@mui/material/Button'

import { Controller, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'

import PageContainer from '@/app/(dashboard)/components/container/PageContainer'
import DashboardCard from '@/app/(dashboard)/components/shared/DashboardCard'
import { Selection } from '@/app/(dashboard)/pln/components/Selection/index'
import { PLNGuide } from '@/app/fake-db/pages/faq'
import { HitToApi } from '@/app/server/actions'
import type { RootState } from '@/app/store'
import { resetInquiry, resetPayment, setInquiry } from '@/app/store'
import { mailingLists } from '@/data/pln'

import FAQ from './components/Faq/index'
import Inquiry from './components/inquiry/Inquiry'
import Payment from './components/Payment/Payment'

interface FormData {
  registrationNumber: string
}

export default function Page() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>()

  const [pilih, setPilih] = useState<number>(1)
  const inquiry = useSelector((state: RootState) => state.inquiry)
  const payment = useSelector((state: RootState) => state.payment)
  const [selectedMailingList, setSelectedMailingList] = useState<string>('Prepaid')
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const isMdUp = theme.breakpoints.up('xl')
  const dispatch = useDispatch()

  const onSubmit = async (formValue: FormData) => {
    setLoading(true)
    dispatch(resetInquiry())
    dispatch(resetPayment())

    try {
      const productMap: Record<number, string> = {
        1: 'PLNPRAH',
        2: 'PLNPASCH',
        3: 'PLNNON'
      }

      const request = {
        mti: 'cek',
        product: productMap[pilih],
        idpel: formValue.registrationNumber
      }

      const result = await HitToApi(request)

      if (!result) {
        toast.error(`Failed => No response from API.`, {
          position: 'top-right',
          autoClose: 5000
        })
      }

      if (result.responseCode !== '00') {
        toast.error(`Failed => ${result.responseMessage}`, {
          position: 'top-right',
          autoClose: 5000
        })
      } else {
        dispatch(setInquiry(result))
      }
    } catch (error: any) {
      toast.error(`Failed => ${error.message.toLowerCase()}`, {
        position: 'top-right',
        autoClose: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='PLN categories' description='PLN categories'>
      <Box sx={{ p: { sm: 0, md: 4 } }}>
        <Grid {...(isMdUp ? { container: true } : {})} spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title='Purchase Token or Pay Electricity Bill.'>
              <Grid {...(isMdUp ? { container: true } : {})} spacing={3}>
                {/* Form Section */}
                <Grid item xs={12} md={7}>
                  <form
                    noValidate
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full flex flex-col gap-5'
                  >
                    <Selection
                      data={mailingLists}
                      selectedMailingList={selectedMailingList}
                      setSelectedMailingList={setSelectedMailingList}
                      setPilih={setPilih}
                    />
                    <div className='mt-4'>
                      <Typography variant='h6' className='mb-2'>
                        {mailingLists.filter(x => x.name === selectedMailingList).map(x => x.title)}
                      </Typography>
                      <Controller
                        name='registrationNumber'
                        control={control}
                        rules={{
                          required: 'Registration number is required.',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Registration number must be a valid number.'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            sx={{ maxWidth: { xs: '100%', md: '550px' } }} // Adjusts width based on screen size
                            variant='standard'
                            type='text'
                            error={!!errors.registrationNumber}
                            helperText={errors.registrationNumber?.message}
                          />
                        )}
                      />
                    </div>
                    <div className='w-full sm:w-full md:w-[300px] mt-8'>
                      <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                      >
                        {loading ? 'Submitting...' : 'Inquiry'}
                      </Button>
                    </div>
                  </form>
                </Grid>
                {/* Detail Inquiry Section */}
                <Grid item xs={12} md={5}>
                  {!loading && inquiry?.responseCode === '00' ? <Inquiry /> : null}
                  {payment?.responseCode === '00' ? <Payment /> : null}
                </Grid>
                <Grid item xs={12} className='mt-4 mb-12'>
                  <FAQ data={PLNGuide} />
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
