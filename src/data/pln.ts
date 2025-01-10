export interface ListPLN {
  name: string
  lastMessage: string
  title: string
}

export const mailingLists: ListPLN[] = [
  {
    name: 'Prepaid',
    lastMessage: 'Masukkan nomor token untuk PLN Prabayar.',
    title: 'No Meter/ID Pelanggan'
  },
  {
    name: 'Postpaid',
    lastMessage: 'Lakukan pembayaran untuk tagihan PLN Pascabayar Anda.',
    title: 'ID Pelanggan'
  },
  {
    name: 'Non-Tag List',
    lastMessage: 'Bayar tagihan PLN Non-Tagihan Listrik Anda dengan mudah.',
    title: 'No Registrasi'
  }
]

export const prepaidList = [20000, 50000, 100000, 200000, 500000, 1000000, 5000000, 10000000, 50000000]
