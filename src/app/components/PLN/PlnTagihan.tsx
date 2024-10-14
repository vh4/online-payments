'use client';

import { useState } from 'react';
import { Button, Input, Message, useToaster, Form } from 'rsuite';
import { Controller, useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { checkPlnPostpaid } from '../../client/plnService';

interface FormData {
  registrationNumber: string;
}

export default function PlnForm() {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>();
  const [productType, setProductType] = useState<string>('Token Listrik');
  const [selectedMailingList, setSelectedMailingList] = useState<string | null>(null);
  const toaster = useToaster();

  const mailingLists = [
    { name: 'Prepaid', lastMessage: 'Enter the token number for Prepaid PLN.' },
    { name: 'Postpaid', lastMessage: 'Make a payment for your Postpaid PLN bill.' },
    { name: 'Non-Tag List', lastMessage: 'Easily pay your Non-Tag List PLN bill.' },
  ];

  const onSubmit = async (formValue: FormData) => {
    try {
      console.log(formValue);
      const result = await checkPlnPostpaid(formValue.registrationNumber);
      console.log(result);
    } catch (error:any) {
      toaster.push(
        <Message type="error" duration={4000}>
          {`An error occurred: ${error.message}`}
        </Message>,
        { placement: 'topEnd' }
      );
    }
  };

  return (
    <div className="text-gray-700 mx-auto px-16 py-4 bg-white rounded-lg">
      <h2 className="text-lg font-bold mb-6 text-gray-600">
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
            {mailingLists.map((list) => (
              <div
                key={list.name}
                onClick={() => setSelectedMailingList(list.name)}
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

        {/* Registration Number Input */}
        <Form.Group controlId="registrationNumber" className="mt-4">
          <Form.ControlLabel className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </Form.ControlLabel>
          <Controller
            name="registrationNumber"
            control={control}
            rules={{ required: 'Registration number is required.' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Please input registration number."
                className={`block w-full p-3 border-b ${
                  errors.registrationNumber
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none hover:ring-blue-500`}
              />
            )}
          />
          {errors.registrationNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.registrationNumber.message}
            </span>
          )}
        </Form.Group>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            appearance="primary"
            className="block w-[300px] mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Pay
          </Button>
        </div>
      </Form>
    </div>
  );
}
