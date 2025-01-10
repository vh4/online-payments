'use client'

// React Imports
import { useState } from 'react'

import { BsFillPatchCheckFill } from 'react-icons/bs'
import { PiDownloadSimple } from 'react-icons/pi'

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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'

// Third-party Imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'

const PaymentCard = () => {
  // States
  const [collapse] = useState(false)
  const [reload] = useState(false)
  const [visibility] = useState(false)
  const payment = useSelector((state: RootState) => state.payment)

  const handlePrint = (url: string) => {
    const printWindow = window.open(url, '_blank', 'width=800,height=600')

    if (printWindow) {
      printWindow.focus()
      printWindow.onload = () => printWindow.print()
    } else {
      console.error('Failed to open print window')
    }
  }

  return (
    <Fade in={!visibility} timeout={300}>
      <Card
        className='relative mt-0 xl:-mt-20'
        sx={{
          boxShadow: { xs: 'none', sm: 'inherit' },
          border: { xs: 'none', sm: '1px' }
        }}
      >
        <CardHeader
          sx={{
            textAlign: 'center' // Mengatur header agar di tengah
          }}
          title={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2, // Jarak antar elemen
                mt: 2
              }}
            >
              <BsFillPatchCheckFill size={42} className='text-green-500 my-2' />
              <Typography sx={{ my: 0 }} variant='h5'>
                Payment Success!
              </Typography>
              <Typography variant='h3' sx={{ fontWeight: 'bold', my: 0 }}>
                Rp. {parseInt(payment.total_bayar).toLocaleString()}
              </Typography>
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
                  {/* <TableHead>
                    <TableRow>
                      <TableCell align='left' sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                        Field
                      </TableCell>
                      <TableCell align='left' sx={{ borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>No Registrasi</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{payment.idpel1}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Nama</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{payment.data.namapelanggan}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Reff</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{payment.data.reff}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Tanggal Registrasi</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{payment.data.registrationdate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexWrap: 'wrap',
                  gap: 2,
                  mt: 8
                }}
              >
                <Button
                  variant='outlined'
                  color='success'
                  sx={{
                    minWidth: '120px'
                  }}
                  onClick={() => handlePrint(payment.struk)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <PiDownloadSimple size={24} />
                    <Typography>Download</Typography>
                  </Box>
                </Button>
              </Box>
              <Typography variant='body2' sx={{ px: 4, py: 6, color: 'text.secondary' }}>
                Dengan melanjutkan pembayaran ini, Anda menyetujui Ketentuan dan Kebijakan Privasi kami. semua
                pembayaran bersifat final dan tidak dapat dikembalikan.
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

export default PaymentCard
