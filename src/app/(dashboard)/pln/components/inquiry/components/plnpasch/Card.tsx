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
import { RootState } from '@/app/store'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

const InquiryCard = () => {
  // States
  const [collapse, setCollapse] = useState(false)
  const [reload, setReload] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const inquiry = useSelector((state: RootState) => state.inquiry)

  const handleBackDrop = () => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000)
  }

  return (
    <Fade in={!visibility} timeout={300}>
      <Card
        className='relative mt-0 xl:-mt-8'
        sx={{
          boxShadow: { xs: 'none', sm: 'inherit' }, // Hilangkan shadow pada mobile
          border: { xs: 'none', sm: '1px' } // Hilangkan border pada mobile
        }}
      >
        <CardHeader
          title='Detail Inquiry'
          subheader="Click 'Pay' to proceed with your payment."
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
                  boxShadow: 'none', // Tetap tanpa shadow
                  borderRadius: 0 // Opsional: Menghapus radius sudut
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
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Name</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{inquiry.data.namapelanggan}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Customer Number</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>{inquiry.idpel1}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>Tarif / Daya</TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #ddd' }}>
                        {inquiry.data.tarif} / {parseInt(inquiry.data.daya, 10).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', p: 4, justifyContent: 'space-between' }}>
                <Typography variant='subtitle1'>Total</Typography>
                <Typography variant='subtitle1' fontWeight='bold'>
                  Rp. {parseInt(inquiry.total_bayar).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' color='success' sx={{ left: 0 }}>
                  Proceed With Payment
                </Button>
              </Box>
              <Typography variant='body2' sx={{ p: 4, color: 'text.secondary' }}>
                By proceeding, you agree to our Terms and Privacy Policy. Payments are non-refundable.
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
