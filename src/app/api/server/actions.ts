import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { uniqueId } from 'lodash'
import { useSession } from 'next-auth/react'

import type { ApiResponse } from '@/types/storeType'

interface CheckPlnRequest {
  method: string
  produk: string
  idpel: string
  ref1: string
  nominal?: number
}

const axiosInstance = axios.create({
  baseURL: process.env.RB_URL
})

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const { data: session }: any = useSession()
    const accessToken = session?.user?.token

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  } catch (error) {
    return Promise.reject(error)
  }

  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

const apiRequest = async (data: CheckPlnRequest): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>('/api/', data)

  return response.data
}

//data products filled in the below broww...
export const HitToApi = async ({ mti, product, idpel }: { mti: string; product: string; idpel: string }) => {
  return apiRequest({
    method: mti,
    produk: product,
    idpel,
    ref1: uniqueId()
  })
}
