'use client'

import { FaCheckCircle } from 'react-icons/fa'

interface SelectionProps {
  data: { name: string; lastMessage: string }[]
  selectedMailingList: string | null
  setSelectedMailingList: (name: string) => void
  setPilih: (index: number) => void
}

export const Selection = ({ data, selectedMailingList, setSelectedMailingList, setPilih }: SelectionProps) => {
  return (
    <div className='max-w-xl mt-2 py-4'>
      <div className='flex flex-col space-y-4'>
        {data.map((list, i) => (
          <div
            key={list.name}
            onClick={() => {
              setSelectedMailingList(list.name)
              setPilih(i + 1)
            }}
            className={`cursor-pointer border p-4 rounded-lg transition duration-200 ${
              selectedMailingList === list.name ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className='flex justify-between items-center'>
              <span className='font-medium'>{list.name}</span>
              {selectedMailingList === list.name && <FaCheckCircle className='text-green-500' size={18} />}
            </div>
            <p className='text-sm'>{list.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
