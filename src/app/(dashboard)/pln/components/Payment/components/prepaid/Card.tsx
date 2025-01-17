'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

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
import gsap from 'gsap'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { PiDownloadSimple } from 'react-icons/pi'
import { RxChevronDown, RxChevronUp } from 'react-icons/rx'

// Third-party Imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'

const PaymentCard = () => {
  // States
  const [visibility] = useState(false)
  const payment = useSelector((state: RootState) => state.payment)

  const [showMore, setShowMore] = useState(false)
  const detailsRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (showMore) {
      gsap.to(detailsRef.current, {
        height: 'auto',
        duration: 0.5,
        opacity: 1,
        y: 0,
        scrollBehavior: 'true'
      })
      gsap.to(containerRef.current, { y: 0, duration: 0.5 })
    } else {
      gsap.to(detailsRef.current, { height: 0, duration: 0.5, opacity: 0 })
    }
  }, [showMore])

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

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
        ref={containerRef}
        className='relative mt-8 xl:-mt-10'
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
              <BsFillPatchCheckFill size={28} className='text-green-500' />
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
                {[
                  { label: 'No Meter', value: payment.data.nomormeter },
                  { label: 'ID Pelanggan', value: payment.data.idpel },
                  { label: 'Nama', value: payment.data.namapelanggan },
                  {
                    label: 'Tarif / Daya',
                    value: `${payment.data.tarif} / ${parseInt(payment.data.daya).toLocaleString()} VA`
                  },
                  { label: 'SReff', value: payment.data.noref },
                  { label: 'RP Bayar', value: `Rp. ${parseInt(payment.data.rp_bayar).toLocaleString()}` }
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        borderBottom: '0.1px solid #f3f4f6',
                        width: '40%',
                        textAlign: 'left', // Align text for labels
                        padding: '8px'
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '0.1px solid #f3f4f6',
                        width: '60%',
                        textAlign: 'right', // Align text for values
                        padding: '8px'
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              onClick={toggleShowMore}
              sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}
            >
              {showMore ? <RxChevronUp size={24} /> : <RxChevronDown size={24} />}
            </Box>
          </TableContainer>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 'none',
              borderRadius: 0,
              overflow: 'hidden',
              opacity: 0
            }}
            ref={detailsRef}
          >
            <Table>
              <TableBody>
                {[
                  { label: 'Admin Bank', value: `Rp. ${parseInt(payment.data.admin_bank).toLocaleString()}` },
                  { label: 'Materai', value: `Rp. ${parseInt(payment.data.materai).toLocaleString()}` },
                  { label: 'Ppn', value: `Rp. ${parseInt(payment.data.ppn).toLocaleString()}` },
                  { label: 'Pbjt-TL', value: `Rp. ${parseInt(payment.data.pbjttl).toLocaleString()}` },
                  { label: 'Angsuran', value: `Rp. ${parseInt(payment.data.angsuran).toLocaleString()}` },
                  { label: 'Rp Token', value: `Rp. ${parseInt(payment.data.rp_token).toLocaleString()}` },
                  { label: 'Biaya Admin', value: `Rp. ${parseInt(payment.data.admin_bank).toLocaleString()}` },
                  { label: 'Jumlah Kwh', value: parseInt(payment.data.totalkwh).toLocaleString(), bold: true },
                  { label: 'Token', value: payment.data.tokenpln, bold: true }
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        borderBottom: row.bold ? '2px solid #030712' : '0.1px solid #f3f4f6',
                        fontWeight: row.bold ? 'bold' : 'normal',
                        width: '40%',
                        textAlign: 'left',
                        padding: '8px'
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: row.bold ? '2px solid #030712' : '0.1px solid #f3f4f6',
                        fontWeight: row.bold ? 'bold' : 'normal',
                        width: '60%',
                        textAlign: 'right',
                        padding: '8px'
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
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
          onClick={toggleShowMore}
          sx={{
            backgroundColor: '#4ade80', // Green background
            color: 'white', // White text for contrast
            textAlign: 'center', // Center the content
            padding: '16px', // Padding for spacing
            borderTopLeftRadius: '20px', // Rounded top-left corner
            borderTopRightRadius: '20px', // Rounded top-right corner
            cursor: 'pointer'
          }}
        >
          <Typography variant='body2'>{payment.data.footer}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '24px'
            }}
          >
            <div className='p-1 px-16 bg-white rounded-full'></div>
          </Box>
        </Box>
      </Card>
    </Fade>
  )
}

export default PaymentCard
