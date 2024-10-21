'use client';

import { useState } from 'react';
import { Button, useToaster, Form, Loader, Notification } from 'rsuite';
import { Controller, useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { checkPlnPostpaid } from '../../../api/client/plnpaschService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setInquiry } from '../../../store/index';
import { checkPlnNonTag } from '@/app/api/client/plnnontagService';
import { checkPlnPra } from '@/app/api/client/plnpra';

interface FormData {
  registrationNumber: string;
}

export default function PlnForm() {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>();
  
  //pilih for data prepaid or postpaid or nontaglist
  const [pilih, setPilih] = useState<number|null>(1);

  //for prepaid nominal pick
  const [nominal, setNominal] = useState<number>(25000);

  const [selectedMailingList, setSelectedMailingList] = useState<string | null>('Prepaid');
  
  const [loading, setLoading] = useState(false); // Loading state
  const toaster = useToaster();
  const router = useRouter();
  const dispatch = useDispatch();

  //for list pln
  const mailingLists = [
    { name: 'Prepaid', lastMessage: 'Enter the token number for Prepaid PLN.', title:'No.Meter/ID Pelanggan' },
    { name: 'Postpaid', lastMessage: 'Make a payment for your Postpaid PLN bill.', title:'ID Pelanggan'},
    { name: 'Non-Tag List', lastMessage: 'Easily pay your Non-Tag List PLN bill.', title:'Registration Number'},
  ];

  //for prepaid pln;
  const prepaidList = [25000,50000,75000,100000,200000,500000,1000000,5000000,10000000];
  
  const onSubmit = async (formValue: FormData) => {
    setLoading(true); 

    try {

      //prepaid
      if(pilih == 1){


        const result = await checkPlnPra(formValue.registrationNumber, nominal);
        if(result.status != '00'){
          
          toaster.push(
            <Notification className='m-4 pr-24' type="error" title='Failed' header="Failed">
              {result.keterangan}
            </Notification>,{
              placement: 'topEnd'
          }
          );

        }else{
  
          dispatch(setInquiry(result));
          setLoading(false);
          router.push(`/categories/plnpra`);
        }

      //postpaid
      }else if(pilih == 2){

        const result = await checkPlnPostpaid(formValue.registrationNumber);
  
        if(result.status != '00'){
          
          toaster.push(
            <Notification className='m-4 pr-24' type="error" title='Failed' header="Failed">
              {result.keterangan}
            </Notification>,{
              placement: 'topEnd'
          }
          );

        }else{
  
          dispatch(setInquiry(result));
          setLoading(false);
          router.push(`/categories/plnpasch`);
        }

       //nontaglist
      }else if(pilih == 3){

        const result = await checkPlnNonTag(formValue.registrationNumber);
  
        if(result.status != '00'){
          
          toaster.push(
            <Notification className='m-4 pr-24' type="error" title='Failed' header="Failed">
              {result.keterangan}
            </Notification>,{
              placement: 'topEnd'
          }
          );

        }else{
  
          dispatch(setInquiry(result));
          setLoading(false);
          router.push(`/categories/plnnon`);
        }

      }


    } catch (error) {
      toaster.push(
        <Notification className='pr-24' type="error" title='Failed' header="Failed">
        {`An error occurred: ${error}`}
        </Notification>,{
          placement: 'topEnd'
        }
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="text-gray-700 px-4 md:px-24 lg:px-32 pt-6 pb-12 bg-white rounded-lg">
      <h2 className="mt-4 text-lg font-bold mb-6 text-gray-600">
        Purchase Token or Pay Electricity Bill.
      </h2>

      <Form
        onSubmit={(checkStatus, e) => {
          e?.preventDefault();
          handleSubmit(onSubmit)();
        }}
        layout="vertical"
      >
        {/* Product Type Selection */}
        <div className="max-w-xl mt-2 py-4">
          <div className="flex flex-col space-y-4">
            {mailingLists.map((list, i) => (
              <div
                key={list.name}
                onClick={() => {setSelectedMailingList(list.name); setPilih(i + 1)}}
                className={`cursor-pointer border p-4 rounded-lg shadow transition duration-200 ${
                  selectedMailingList === list.name
                    ? 'border-blue-500 bg-white'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{list.name}</span>
                  {selectedMailingList === list.name && (
                    <FaCheckCircle className="text-green-500" size={18} />
                  )}
                </div>
                <p className="text-gray-500 text-sm">{list.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* postpaid, prepaid, nontaglist */}
        {
          (
            <>
              {/* Registration Number Input */}
              <Form.Group controlId="registrationNumber" className="mt-4">
                <Form.ControlLabel className="block text-sm font-medium text-gray-700 mb-2">
                {mailingLists
                  .filter((x) => x.name === selectedMailingList)
                  .map((x) => x.title)}
                </Form.ControlLabel>
                    <Controller
                      name="registrationNumber"
                      control={control}
                      rules={{
                        required: 'Registration number is required.',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Registration number must be a valid number.',
                        },
                      }}
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            type="number"
                            inputMode="numeric"
                            placeholder="Please input your ID"
                            className={`block w-full p-3 border-b ${
                              errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none hover:ring-blue-500 appearance-none`}
                          />
                        </div>
                      )}
                    />
                {errors.registrationNumber && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.registrationNumber.message}
                  </span>
                )}
              </Form.Group>
            </>
          )
        }

        {/* if 1 select prepaid with nominal 10k, 20k... */}
        {
          pilih == 1 && (
            <>
              <div className="max-w-[60rem] mt-2 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {prepaidList.map((data) => (
                    <div
                      key={data}
                      onClick={() => setNominal(data)}
                      className={`cursor-pointer border p-4 rounded-lg shadow transition duration-200 ${
                        nominal === data
                          ? 'border-blue-500 bg-white'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-center items-center text-center">
                        <span className="text-xs">Rp {data.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        }
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            appearance="primary"
            className="block w-full md:w-[300px] mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading} // Disable button during loading
          >
            {loading ? <Loader size="sm" content="Processing..." /> : 'Pay'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
