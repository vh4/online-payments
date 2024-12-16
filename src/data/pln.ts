export interface ListPLN {
  name: string
  lastMessage: string
  title: string
}

export const mailingLists: ListPLN[] = [
  {
    name: 'Prepaid',
    lastMessage: 'Enter the token number for Prepaid PLN.',
    title: 'No.Meter/ID Pelanggan'
  },
  {
    name: 'Postpaid',
    lastMessage: 'Make a payment for your Postpaid PLN bill.',
    title: 'ID Pelanggan'
  },
  {
    name: 'Non-Tag List',
    lastMessage: 'Easily pay your Non-Tag List PLN bill.',
    title: 'Registration Number'
  }
]

export const prepaidList = [20000, 50000, 100000, 200000, 500000, 1000000, 5000000, 10000000, 50000000]
