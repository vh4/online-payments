'use server'

import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import type { ApiResponse } from '@/types/storeType'
import { isOptions } from '@/utils/auth.options'
import { getServerSession } from 'next-auth'
import { v4 as uuid } from 'uuid'

interface CheckPlnRequest {
  method: string
  produk: string
  idpel: string
  ref1: string
  nominal?: number
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
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
    const response = await axiosInstance.post<ApiResponse>(`/api/inquiry/${data.produk.toLowerCase()}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.responseMessage || error.message)
  }
}

//data products filled in the below broww...
export const HitToApi = async ({ mti, product, idpel }: { mti: string; product: string; idpel: string }) => {
  return apiRequest({
    method: mti,
    produk: product,
    idpel,
    ref1: uuid()
  })
}
