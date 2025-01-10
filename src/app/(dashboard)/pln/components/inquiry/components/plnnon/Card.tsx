'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Icon from '@mui/material/Icon'

// Third-party Imports

import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import type { RootState } from '@/app/store'
import { resetInquiry, setPayment } from '@/app/store'

import { HitToApi } from '@/app/server/actions'

const InquiryCard = () => {
  // States
  const [collapse, setCollapse] = useState(false)
  const [reload, setReload] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const inquiry = useSelector((state: RootState) => state.inquiry)

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleBackDrop = () => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000)
  }

  const handlePayment = async () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const result = await HitToApi({
          mti: 'bayar',
          product: inquiry.kodeproduk,
          idpel: inquiry.idpel1
        })

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
          dispatch(resetInquiry())
          dispatch(setPayment(result))
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  return (
    <Fade in={!visibility} timeout={300}>
      <Card
        className='relative mt-4 md:-mt-16'
        sx={{
          boxShadow: { xs: 'none', sm: 'inherit' },
          border: { xs: 'none', sm: '1px' }
        }}
      >
        <CardHeader
          title='Info Pembayaran Tagihan'
          subheader="Click 'Pay' untuk melanjutkan proses pembayaran."
          action={
            <Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size='small' aria-label='collapse' onClick={() => setCollapse(!collapse)}>
                  <Icon className={classnames(collapse ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line', 'text-xl')} />
                </IconButton>
                <IconButton size='small' aria-label='refresh-content' onClick={handleBackDrop}>
                  <Icon className='ri-refresh-line text-xl' />
                </IconButton>
                <IconButton size='small' aria-label='remove-card' onClick={() => setVisibility(!visibility)}>
                  <Icon className='ri-close-line text-xl' />
                </IconButton>
              </Box>
            </Box>
          }
        />
        <Collapse in={!collapse}>
          <CardContent>
            <Box>
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: 'none',
                  borderRadius: 0
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left' sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                        Field
                      </TableCell>
                      <TableCell align='left' sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>No Registrasi</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{inquiry.idpel1}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Nama</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{inquiry.data.namapelanggan}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Reff</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{inquiry.data.reff}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '0px solid #ddd', fontWeight: 'bold' }}>Total</TableCell>
                      <TableCell sx={{ borderBottom: '0px solid #ddd', fontWeight: 'bold' }}>
                        Rp. {parseInt(inquiry.total_bayar).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  onClick={handlePayment}
                  variant='contained'
                  color='success'
                  sx={{ left: 0 }}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Paying...' : 'Proceed Payment'}
                </Button>
              </Box>
              <Typography variant='body2' sx={{ p: 4, color: 'text.secondary' }}>
                Dengan melanjutkan, Anda menyetujui Ketentuan dan Kebijakan Privasi kami. Pembayaran tidak dapat
                dikembalikan.{' '}
              </Typography>
            </Box>
          </CardContent>
          <Backdrop open={reload} sx={{ position: 'absolute', zIndex: 1301 }}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </Collapse>
      </Card>
    </Fade>
  )
}

export default InquiryCard
