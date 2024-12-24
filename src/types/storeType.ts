// Define the shape of the PLN data
export interface ApiResponse {
  isLoading: boolean
  isError: boolean
  kodeproduk: string
  tanggal: string
  idpel1: string
  nominal: string
  admin: string
  fee: string
  total_bayar: string
  responseCode: string
  responseMessage: string
  [key: string]: any
}

export const InitialMandatory: ApiResponse = {
  isLoading: false,
  isError: false,
  kodeproduk: '',
  tanggal: '',
  idpel1: '',
  nominal: '',
  admin: '',
  fee: '',
  total_bayar: '',
  responseCode: '',
  responseMessage: ''
}

export interface ReqeustType {
  idpel: string
  produk: string
  method: string
  nominal?: number
  ref1?: string
}
