'use server'

import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import { getServerSession } from 'next-auth'

import { v4 as uuid } from 'uuid'

import type { ApiResponse } from '@/types/storeType'
import { isOptions } from '@/utils/auth.options'

interface CheckPlnRequest {
  method: string
  produk: string
  idpel: string
  ref1: string
  nominal?: number
}

export interface globalSetting {
  kunci: string
  nilai: string
  keterangan: string
  data?: Record<string, string | any>[] | any
  responseCode?: string
  responseMessage?: string
}

const axiosInstance = axios.create({
  baseURL: process.env.RB_URL
})

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const session: any = await getServerSession(isOptions)

    if (session.token) {
      config.headers.Authorization = `Bearer ${session.token}`
    }
  } catch (error) {
    return Promise.reject(error)
  }

  return config
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

const apiRequest = async (data: CheckPlnRequest): Promise<ApiResponse> => {
  try {
    let mti = 'inquiry'

    if (data.method == 'bayar') {
      mti = 'payment'
    }

    const response = await axiosInstance.post<ApiResponse>(`/api/${mti}/${data.produk.toLowerCase()}`, data)

    return response.data
  } catch (error: any) {
    return error.response && error.response.data
      ? error.response.data
      : { responseCode: '68', responseMessage: error.message }
  }
}

export const getProduct = async (): Promise<globalSetting> => {
  try {
    const response = await axiosInstance.get<globalSetting>(`/api/utility/list-product`)

    
return response.data
  } catch (error: any) {
    return error.response && error.response.data
      ? error.response.data
      : { responseCode: '68', responseMessage: error.message }
  }
}

//data products filled in the below broww...
export const HitToApi = async ({
  mti,
  product,
  idpel,
  nominal = 0
}: {
  mti: string
  product: string
  idpel: string
  nominal?: number
}) => {
  const request: CheckPlnRequest = {
    method: mti,
    produk: product,
    idpel,
    ref1: uuid()
  }

  if (product == 'PLNPRAH') {
    if (mti == 'bayar') {
      request['nominal'] = nominal
    } else {
      request['nominal'] = 0
    }
  }

  return apiRequest(request)
}
