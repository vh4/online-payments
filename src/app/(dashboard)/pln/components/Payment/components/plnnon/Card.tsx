'use client'

// React Imports
import { useState } from 'react'

import { BsFillPatchCheckFill } from 'react-icons/bs'

// MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { PiDownloadSimple } from 'react-icons/pi'

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
        className='relative mt-0 xl:-mt-10'
        sx={{
          borderRadius: 2, // Rounded corners
          overflow: 'hidden' // Ensure the footer aligns perfectly with the Card
        }}
      >
        <CardHeader
          sx={{
            textAlign: 'center' // Center-align the header
          }}
          title={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2, // Space between elements
                mt: -2
              }}
            >
              <BsFillPatchCheckFill size={24} className='text-green-500 my-2' />
              <Typography sx={{ my: 0 }} variant='h5'>
                Pembayaran anda berhasil!
              </Typography>
              <Typography sx={{ my: 0 }} variant='subtitle2'>
                {payment.tanggal}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 'none',
              borderRadius: 0
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>Jenis Transaksi</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>{payment.data.transaksi}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>No Registrasi</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>
                    {payment.data.noregistration}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>Tanggal Registrasi</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>
                    {payment.data.registrationdate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>Nama</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>
                    {payment.data.namapelanggan}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>ID Pelanggan</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3 }}>{payment.data.idpel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3, color: '#9ca3af' }}>Tagihan</TableCell>
                  <TableCell sx={{ borderBottom: '0.1px solid #f3f4f6', py: 3, color: '#9ca3af' }}>
                    Rp. {parseInt(payment.data.biaya_pln).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '2px solid #030712', py: 3, color: '#9ca3af' }}>Biaya Admin</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #030712', py: 3, color: '#9ca3af' }}>
                    Rp. {parseInt(payment.data.admin_bank).toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: '2px solid #030712', fontWeight: 'bold' }}>Total Tagihan</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #030712', fontWeight: 'bold' }}>
                    Rp. {parseInt(payment.total_bayar).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <Typography
              variant='body2'
              sx={{
                display: 'flex',
                justifyContent: 'start',
                px: 4,
                pt: 6,
                color: 'text.secondary'
              }}
            >
              ~{payment.data.kata1}.~
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              gap: 2,
              my: 4
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
        </CardContent>
        {/* Footer Section */}
        <Box
          sx={{
            backgroundColor: '#4ade80', // Green background for the footer
            color: 'white', // White text for contrast
            textAlign: 'center', // Center the footer text
            padding: '16px' // Add padding for spacing
          }}
        >
          <Typography variant='body2' sx={{}}>
            {payment.data.footer}
          </Typography>
        </Box>
      </Card>
    </Fade>
  )
}

export default PaymentCard
