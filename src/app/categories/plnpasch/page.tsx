'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPayment } from '../../store/index';
import { Notification, toaster, Button, Loader } from 'rsuite';
import { payPlnPostpaid } from '@/app/api/client/plnpaschService';
import InvoicePLNPasch from '@/app/components/invoice/plnpaschInvoice';
import Image from 'next/image';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const inquiryData = useSelector((state: RootState) => state.inquiry);

  if (!inquiryData.kodeproduk) {
    return (
          <div className="flex justify-center items-center" style={{ height: "calc(100vh - 80px)" }}>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Payment not found.</h2>
              <p className="text-gray-600">
                Please complete an inquiry before proceeding with payment.
              </p>
            </div>
          </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await payPlnPostpaid(inquiryData.subscriberid);

      if (result.status !== '00') {
        toaster.push(
          <Notification className="pr-24" type="error" title="Failed" header="Failed">
            {result.keterangan}
          </Notification>,
          { placement: 'topEnd' }
        );
      } else {
        // Dispatch payment data to Redux
        dispatch(setPayment(result));
        setSuccess(true);
      }
    } catch (error) {
      toaster.push(
        <Notification className="pr-24" type="error" title="Failed" header="Failed">
          {`An error occurred: ${error}`}
        </Notification>,
        { placement: 'topEnd' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="container max-w-screen-xl mx-auto px-6 lg:px-24 bg-white pt-4 pb-12">
      {success ? (
        <><InvoicePLNPasch /></>
      ) : (
      <>
        {/* Checkout Information */}
        <div className="grid items-start pt-8 pb-16">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
            <div className='flex items-center -ml-4'>
              <Image src={'/pln.png'} width={60} height={60} alt='pln.png' />
              <h1 className="text-xl font-bold">PLN Checkout</h1>
            </div>
            <table className="w-full text-left mt-8 text-xs">
              <tbody>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">ID Pelanggan</td>
                  <td className="p-2 text-gray-800">{inquiryData.subscriberid}</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Nama Customer</td>
                  <td className="p-2 text-gray-800">{inquiryData.subscribername}</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Tarif / Daya</td>
                  <td className="p-2 text-gray-800">
                    {inquiryData.subscribersegmentation} / {inquiryData.powerconsumingcategory}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Rp Tag PLN</td>
                  <td className="p-2 text-gray-800">
                    Rp {parseInt(inquiryData.nominal).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">No Referensi</td>
                  <td className="p-2 text-gray-800">{inquiryData.ref2}</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">BL / TH</td>
                  <td className="p-2 text-gray-800">{inquiryData.blth1}</td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Stand Meter</td>
                  <td className="p-2 text-gray-800">
                    {inquiryData.slalwbp1} - {inquiryData.sahlwbp1}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 text-gray-600 font-medium">Biaya Admin</td>
                  <td className="p-2 text-gray-800">
                    Rp {parseInt(inquiryData.admin).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: Payment Summary */}
          <div className="w-full mt-4 p-2">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs font-normal">Price</dt>
                  <dd className="text-xs font-medium">Rp {parseInt(inquiryData.nominal).toLocaleString()}</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs font-normal">Tax</dt>
                  <dd className="text-xs font-medium">Rp {parseInt(inquiryData.admin).toLocaleString()}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-xs font-bold">Total</dt>
                  <dd className="text-xs font-bold">Rp {parseInt(inquiryData.total_bayar).toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className='max-w-full flex justify-end'>
          <div className=''>
          <Button
            type="submit"
            appearance="primary"
            className="block w-[300px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading} // Disable button during loading
            onClick={handleSubmit} 
          >
            {loading ? <Loader size="sm" content="Processing..." /> : 'Pay'}
          </Button>
          </div>
        </div>
      </>)}
      </div>
    </div>
  );
}
