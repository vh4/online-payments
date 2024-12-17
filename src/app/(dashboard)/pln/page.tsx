'use client'

import { useState } from 'react'

import { CircularProgress, Grid } from '@mui/material'

import Button from '@mui/material/Button'

import { Controller, useForm } from 'react-hook-form'

import { Form, Notification, useToaster } from 'rsuite'

import PageContainer from '@/app/(dashboard)/components/container/PageContainer'
import DashboardCard from '@/app/(dashboard)/components/shared/DashboardCard'
import { Selection } from '@/app/(dashboard)/pln/components/Selection/index'
import { HitToApi } from '@/app/api/server/actions'
import { db } from '@/app/fake-db/pages/faq'
import { setInquiry } from '@/app/store'
import { mailingLists } from '@/data/pln'
import type { ApiResponse } from '@/types/storeType'



import FAQ from './components/Faq/index'
import CardActionAll from './components/inquiry/Inquiry'

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

  // const [nominal, setNominal] = useState<number>(20000)
  const [selectedMailingList, setSelectedMailingList] = useState<string>('Prepaid')
  const [loading, setLoading] = useState(false)

  const toaster = useToaster()

  const onSubmit = async (formValue: FormData) => {
    setLoading(true)

    try {
      let result: ApiResponse | undefined

      if (pilih === 1) {
        // result = await HitToApi({ mti: 'cek', product: 'PLNPRA', idpel: formValue.registrationNumber });
      } else if (pilih === 2) {
        result = await HitToApi({ mti: 'cek', product: 'PLNPASCH', idpel: formValue.registrationNumber })
      } else if (pilih === 3) {
        result = await HitToApi({ mti: 'cek', product: 'PLNNON', idpel: formValue.registrationNumber })
      }

      if (!result) {
        throw new Error('No response from API')
      }

      if (result.responseMessage !== '00') {
        toaster.push(
          <Notification type='error' title='Failed' header='Failed'>
            {result.responseMessage}
          </Notification>,
          { placement: 'topEnd' }
        )
      } else {
        setInquiry(result)
      }
    } catch (error) {
      toaster.push(
        <Notification type='error' title='Failed' header='Failed'>
          {`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`}
        </Notification>,
        { placement: 'topEnd' }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='PLN categories' description='PLN categories'>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} xl={12}>
          <DashboardCard title='Purchase Token or Pay Electricity Bill.'>
            <Grid container spacing={3}>
              {/* Input Section - 7 Grid */}
              <Grid item sm={12} md={7}>
                <Form
                  onSubmit={(formValue: Record<string, any> | null, event?: React.FormEvent<HTMLFormElement>) => {
                    event?.preventDefault()
                    handleSubmit(async data => {
                      await onSubmit(data)
                    })()
                  }}
                >
                  <Selection
                    data={mailingLists}
                    selectedMailingList={selectedMailingList}
                    setSelectedMailingList={setSelectedMailingList}
                    setPilih={setPilih}
                  />
                  <Form.Group controlId='registrationNumber' className='mt-4'>
                    <Form.ControlLabel className='block text-sm font-medium mb-2'>
                      {mailingLists.filter(x => x.name === selectedMailingList).map(x => x.title)}
                    </Form.ControlLabel>
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
                        <div className='relative'>
                          <input
                            {...field}
                            type='number'
                            inputMode='numeric'
                            placeholder='Please input your ID'
                            className={`block w-full p-3 border-b ${
                              errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none hover:ring-blue-500 appearance-none`}
                          />
                        </div>
                      )}
                    />
                    {errors.registrationNumber && (
                      <span className='text-red-500 text-sm mt-1'>{errors.registrationNumber.message}</span>
                    )}
                  </Form.Group>
                  <div className='ww-full md:w-[300px] mt-8'>
                    <Button
                      fullWidth
                      variant='contained'
                      type='submit'
                      color='primary'
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                      {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                  </div>
                </Form>
              </Grid>

              {/* Detail Data Section - 5 Grid */}
              <Grid item sm={12} md={5}>
                <CardActionAll />
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
        <Grid item sm={12}>
          <FAQ data={db} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
