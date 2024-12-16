// Define the shape of the PLN data
export interface ApiResponse {
  kodeproduk: string
  tanggal: string
  idpel1: string
  nominal: string
  admin: string
  fee: string
  total_bayar: string
  responseCode: string
  responseMessage: string
  [key: string]: string
}

export const InitialMandatory: ApiResponse = {
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
