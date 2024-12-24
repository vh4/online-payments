import type { AppDispatch } from '@/app/store'
import { useDispatch as useReduxDispatch } from 'react-redux'

export const useDispatch = () => useReduxDispatch<AppDispatch>()
