'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { SlPrinter } from 'react-icons/sl';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';

export default function InvoicePLNPasch() {
  const PaymentData = useSelector((state: RootState) => state.payment);
  const router = useRouter();

  const [isLoading, setDataLoaded] = useState(true); // Controls skeleton loading

    useEffect(() => {
      const timer = setTimeout(() => setDataLoaded(false), 2000); // 3 seconds delay
      return () => clearTimeout(timer); // Cleanup on unmount
    }, []);
  

  const handlePrint = (url: string) => {
    const printWindow = window.open(url, '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      console.error('Failed to open print window');
    }
  };

  return (
    <div className='max-w-screen mx-auto px-8'>
      {/* Header */}
      <div
        className="max-w-24 my-4 flex items-center space-x-2 cursor-pointer group"
        onClick={() => router.push('/')}
      >
        <BiArrowBack size={24} className="text-gray-600 group-hover:text-blue-500" />
        <div className="text-sm text-gray-600 font-semibold group-hover:text-blue-500">
          kembali
        </div>
      </div>

      {/* Table Section */}
      <table className='w-full text-left border-collapse mb-8'>
        <thead>
          <tr className='border-b bg-gray-100'>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'></th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>Idpel</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>Nama</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>Tarif / Daya</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>BL / TH</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>No.Reference</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>Stand Meter</th>
            <th className='py-2 text-sm font-medium text-gray-600 px-4'>#</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b'>
            <td className='py-4 px-4'>
            {isLoading ? <Skeleton width={80} /> : (
              <div className='flex space-x-2 items-center p-2 rounded-full bg-green-500'>
                <IoCheckmarkCircle className='text-white' size={20} />
                <div className='text-sm text-white'>Success</div>
              </div>
            )}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={100} /> : PaymentData.subscriberid || 'N/A'}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={150} /> : PaymentData.subscribername || 'N/A'}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={120} /> : PaymentData.subscribersegmentation || 'N/A'} /{' '}
              {isLoading ? <Skeleton width={80} /> : PaymentData.powerconsumingcategory}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={80} /> : PaymentData.blth1 || 'N/A'}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={100} /> : PaymentData.ref2 || 'N/A'}
            </td>
            <td className='py-4 px-4'>
              {isLoading ? <Skeleton width={100} /> : `${PaymentData.slalwbp1} - ${PaymentData.sahlwbp1}`}
            </td>
            <td
              className="py-4 px-4 cursor-pointer"
              onClick={() =>
                handlePrint(`https://c-dev-struk.rajabiller.com/index.php/service?id=${PaymentData.ref2}`)
              }
            >
              <SlPrinter size={18} className="text-gray-600" />
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
              {isLoading ? <Skeleton width={80} /> : `Rp ${parseInt(PaymentData.nominal || '0').toLocaleString()}`}
            </span>
          </div>
          <div className='flex justify-between py-2'>
            <span className='text-gray-600'>Admin</span>
            <span className='text-gray-800'>
              {isLoading ? <Skeleton width={80} /> : `Rp ${parseInt(PaymentData.admin || '0').toLocaleString()}`}
            </span>
          </div>
          <div className='flex justify-between py-2 font-bold border-t'>
            <span className='text-gray-600'>Total Paid</span>
            <span className='text-gray-800'>
              {isLoading ? <Skeleton width={80} /> : `Rp ${parseInt(PaymentData.total_bayar || '0').toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
