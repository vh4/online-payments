'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPayment } from '../../store/index';
import { Notification, toaster, Button, Loader } from 'rsuite';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { payPlnPra } from '@/app/api/client/plnpra';
import InvoicePLNPra from '@/app/components/invoice/plnpraInvoice';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Controls skeleton loading
  const router = useRouter();

  const dispatch = useDispatch();
  const inquiryData = useSelector((state: RootState) => state.inquiry);

  // Simulate data loading with a 3-second delay
  useEffect(() => {
    const timer = setTimeout(() => setDataLoaded(true), 2000); // 3 seconds delay
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

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
      const result = await payPlnPra(inquiryData.idpel1, parseInt(inquiryData.nominal));
      if (result.status !== '00') {
        toaster.push(
          <Notification className="pr-24" type="error" title="Failed" header="Failed">
            {result.keterangan}
          </Notification>,
          { placement: 'topEnd' }
        );
      } else {
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

  // Helper component for skeleton loader
  const Skeleton = ({ width }: { width: string }) => (
    <div className={`bg-gray-200 animate-pulse`} style={{ width, height: '10px' }} />
  );

  return (
    <div className="flex justify-center mt-4">
      <div className="container max-w-screen-2xl mx-auto px-6 lg:px-24 2xl:px-36 bg-white pt-4 pb-12">
        {success ? (
          <InvoicePLNPra />
        ) : (
          <>
            <div className="grid items-start pt-8 pb-16">
              <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                <div className="flex items-center -ml-4">
                  <Image src={'/pln.png'} width={60} height={60} alt="pln.png" />
                  <h1 className="text-xl font-bold">PLN Checkout</h1>
                </div>
                <table className="w-full text-left mt-8 text-xs">
                  <tbody>
                    <tr>
                      <td className="p-2 text-gray-600 font-medium">Nomor Meter</td>
                      <td className="p-2 text-gray-800">
                        {dataLoaded ? inquiryData.nomormeter : <Skeleton width="150px" />}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-600 font-medium">Nama Customer</td>
                      <td className="p-2 text-gray-800">
                        {dataLoaded ? inquiryData.namapelanggan : <Skeleton width="200px" />}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-600 font-medium">Tarif / Daya</td>
                      <td className="p-2 text-gray-800">
                        {dataLoaded ? (
                          `${inquiryData.subscribersegmentation} / ${parseInt(inquiryData.powerconsumingcategory)}`
                        ) : (
                          <Skeleton width="180px" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-600 font-medium">Rp Tag PLN</td>
                      <td className="p-2 text-gray-800">
                        {dataLoaded ? (
                          `Rp ${parseInt(inquiryData.nominal).toLocaleString()}`
                        ) : (
                          <Skeleton width="100px" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 text-gray-600 font-medium">No. Referensi</td>
                      <td className="p-2 text-gray-800">
                        {dataLoaded ? inquiryData.ref2 : <Skeleton width="180px" />}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Summary */}
              <div className="w-full mt-4 p-2">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-xs font-normal">Price</dt>
                      <dd className="text-xs font-medium">
                        {dataLoaded ? `Rp ${parseInt(inquiryData.nominal).toLocaleString()}` : <Skeleton width="100px" />}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-xs font-normal">Tax</dt>
                      <dd className="text-xs font-medium">
                        {dataLoaded ? `Rp ${parseInt(inquiryData.admin).toLocaleString()}` : <Skeleton width="100px" />}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-xs font-bold">Total</dt>
                      <dd className="text-xs font-bold">
                        {dataLoaded ? `Rp ${parseInt(inquiryData.total_bayar).toLocaleString()}` : <Skeleton width="100px" />}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
              <div className="max-w-full flex justify-end space-x-8 items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer group"
                onClick={() => router.push('/')}
              >
                <IoIosArrowRoundBack size={28} className="text-gray-500 group-hover:text-blue-500" />
                <div className="text-md text-gray-500 font-semibold group-hover:text-blue-500">
                  Back to page
                </div>
              </div>              
              <Button
                type="submit"
                appearance="primary"
                className="block w-[300px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? <Loader size="sm" content="Processing..." /> : 'Pay'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
