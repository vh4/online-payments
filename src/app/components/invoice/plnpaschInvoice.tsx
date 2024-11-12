'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useRouter } from 'next/navigation';
import { SlPrinter } from 'react-icons/sl';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

export default function InvoicePLNPasch() {
  const PaymentData = useSelector((state: RootState) => state.payment);
  const router = useRouter();
  const [isLoading, setDataLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDataLoaded(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = (url: string) => {
    const printWindow = window.open(url, '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  };

  return (
    <div className="px-6">
      {/* Header */}
      <div
        className="mt-4 mb-8 flex items-center space-x-2 cursor-pointer group"
        onClick={() => router.push('/')}
      >
        <IoIosArrowRoundBack size={24} className="text-gray-500 group-hover:text-blue-500" />
        <span className="text-sm text-gray-500 font-semibold group-hover:text-blue-500">
          Back to page
        </span>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mb-8 min-w-[600px]">
          <thead>
            <tr className="border-b bg-gray-100">
              {['', 'Idpel', 'Nama', 'Tarif / Daya', 'BL / TH', 'No.Reference', 'Stand Meter', '#'].map((heading, i) => (
                <th key={i} className="py-2 px-4 text-sm font-medium text-gray-600">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-4">
                {isLoading ? (
                  <Skeleton width={80} />
                ) : (
                  <div className="flex items-center space-x-2 p-2 rounded-full bg-green-500">
                    <IoCheckmarkCircle className="text-white" size={20} />
                    <span className="text-sm text-white">Success</span>
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                {isLoading ? <Skeleton width={100} /> : PaymentData.subscriberid || 'N/A'}
              </td>
              <td className="py-4 px-4">
                {isLoading ? <Skeleton width={150} /> : PaymentData.subscribername || 'N/A'}
              </td>
              <td className="py-4 px-4">
                {isLoading ? (
                  <Skeleton width={120} />
                ) : (
                  `${PaymentData.subscribersegmentation || 'N/A'} / ${PaymentData.powerconsumingcategory}`
                )}
              </td>
              <td className="py-4 px-4">
                {isLoading ? <Skeleton width={80} /> : PaymentData.blth1 || 'N/A'}
              </td>
              <td className="py-4 px-4">
                {isLoading ? <Skeleton width={100} /> : PaymentData.ref2 || 'N/A'}
              </td>
              <td className="py-4 px-4">
                {isLoading ? <Skeleton width={100} /> : `${PaymentData.slalwbp1} - ${PaymentData.sahlwbp1}`}
              </td>
              <td className="py-4 px-4 cursor-pointer" onClick={() => handlePrint(`https://c-dev-struk.rajabiller.com/index.php/service?id=${PaymentData.ref2}`)}>
                <SlPrinter size={18} className="text-gray-600" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-4">
          <SummaryRow label="Subtotal" value={PaymentData.nominal} isLoading={isLoading} />
          <SummaryRow label="Admin" value={PaymentData.admin} isLoading={isLoading} />
          <div className="flex justify-between py-2 font-bold border-t">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-gray-800">
              {isLoading ? <Skeleton width={80} /> : `Rp ${parseInt(PaymentData.total_bayar || '0').toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SummaryRow = ({ label, value, isLoading }: { label: string; value: string | undefined; isLoading: boolean }) => (
  <div className="flex justify-between py-2">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800">
      {isLoading ? <Skeleton width={80} /> : `Rp ${parseInt(value || '0').toLocaleString()}`}
    </span>
  </div>
);
