'use client'

interface PrepaidListProps {
  prepaidList: number[]
  nominal: number
  onNominalSelect: (value: number) => void
}

export const PrepaidList = ({ prepaidList, nominal, onNominalSelect }: PrepaidListProps) => {
  return (
    <div className='max-w-[60rem] mt-2 py-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {prepaidList.map(data => (
          <div
            key={data}
            onClick={() => onNominalSelect(data)}
            className={`cursor-pointer border p-4 rounded-lg transition duration-200 ${
              nominal === data ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className='flex justify-center items-center text-center'>
              <span className='text-xs'>Rp {data.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
