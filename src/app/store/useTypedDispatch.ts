import { useDispatch as useReduxDispatch } from 'react-redux'

import type { AppDispatch } from '@/app/store'

export const useDispatch = () => useReduxDispatch<AppDispatch>()
