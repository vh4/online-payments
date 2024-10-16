'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export default function InvoicePLNPasch() {
  const PaymentData = useSelector((state: RootState) => state.payment);

  if (!PaymentData.kodeproduk) {
    return <div className='text-center mt-32'>No payment data found. Please make an inquiry first.</div>;
  }

  return (
      <div className='max-w-screen-2xl mx-auto px-8 py-4'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg'
            alt='TikTok Logo'
            className='w-24'
          />
          <div className='text-right'>
            <h1 className='text-3xl font-bold'>Invoice</h1>
            <p className='text-gray-600'>
              <span className='font-medium'>Invoice Number:</span> {PaymentData.ref2 || 'N/A'}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Date:</span> {PaymentData.tanggal || 'N/A'}
            </p>
          </div>
        </div>

        {/* Billing Information */}
        <div className='grid grid-cols-2 gap-12 mb-8'>
          <div>
            <h2 className='text-lg font-bold mb-2'>Bill To:</h2>
            <p className='text-gray-600'>{PaymentData.subscribername || 'N/A'}</p>
            <p className='text-gray-600'>{PaymentData.serviceunit || 'N/A'}</p>
            <p className='text-gray-600'>Phone: {PaymentData.serviceunitphone || 'N/A'}</p>
            <p className='text-gray-600 mt-2'>
              <span className='font-medium'>Customer ID:</span> {PaymentData.subscriberid || 'N/A'}
            </p>
          </div>
          <div className='text-right'>
            <h2 className='text-lg font-bold mb-2'>Payment Details</h2>
            <p className='text-gray-600'>
              <span className='font-medium'>Payment Status:</span>{' '}
              {PaymentData.status === '00' ? 'Successful' : 'Failed'}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Billing Month:</span> {PaymentData.blth1 || 'N/A'}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium'>Due Date:</span> {PaymentData.duedate1 || 'N/A'}
            </p>
          </div>
        </div>

        {/* Table Section */}
        <table className='w-full text-left border-collapse mb-8'>
          <thead>
            <tr className='border-b bg-gray-100'>
              <th className='py-2 text-sm font-medium text-gray-600'>Description</th>
              <th className='py-2 text-sm font-medium text-gray-600'>Stand Meter</th>
              <th className='py-2 text-sm font-medium text-gray-600 text-right'>Tarif/Daya</th>
              <th className='py-2 text-sm font-medium text-gray-600 text-right'>BLTH</th>
              <th className='py-2 text-sm font-medium text-gray-600 text-right'>No.Reference</th>
              <th className='py-2 text-sm font-medium text-gray-600 text-right'>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='py-4'>Electricity Bill {PaymentData.blth1 || 'N/A'}</td>
              <td className='py-4 text-right'>{PaymentData.standmeter || 'N/A'}</td>
              <td className='py-4 text-right'></td>
              <td className='py-4 text-right'>
                Rp {parseInt(PaymentData.rptag1 || '0').toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Summary Section */}
        <div className='flex justify-end'>
          <div className='w-full max-w-sm'>
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>Subtotal</span>
              <span className='text-gray-800'>
                Rp {parseInt(PaymentData.totalrptag || '0').toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>Admin</span>
              <span className='text-gray-800'>
                Rp {parseInt(PaymentData.admin || '0').toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between py-2 font-bold border-t'>
              <span className='text-gray-600'>Total Paid</span>
              <span className='text-gray-800'>
                Rp {parseInt(PaymentData.total_bayar || '0').toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className='mt-12'>
          <p className='text-gray-600'>
            <span className='font-medium'>Payment Method:</span> PLN
          </p>
          <p className='text-gray-600'>
            <span className='font-medium'>Reference Number:</span> {PaymentData.ref2 || 'N/A'}
          </p>
          <p className='text-gray-600 mt-4'>
            <span className='font-medium'>Notes:</span> Thank you for your payment.
          </p>
        </div>
      </div>
  );
}
