import type { PayloadAction } from '@reduxjs/toolkit'

import { configureStore, createSlice } from '@reduxjs/toolkit'

import type { ApiResponse } from '@/types/storeType'
import { InitialMandatory } from '@/types/storeType'

// const HitToInquiry = createAsyncThunk<
//   ApiResponse, // The return type of the fulfilled action
//   ReqeustType, // The argument type
//   { rejectValue: string }
// >('inquiry/type', async (data, { rejectWithValue }) => {
//   try {
//     data.ref1 = uniqueId()
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_RB_URL}/api/inquiry/${data.produk}`, data)
//     return response.data
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data || 'An error occurred')
//   }
// })

// const HitToPayment = createAsyncThunk('payment/type', async (data: ReqeustType, { rejectWithValue }) => {
//   try {
//     data.ref1 = uniqueId()
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_RB_URL}/api/payment/${data.produk}`, data)

//     return response.data
//   } catch (error: any) {
//     console.log(error)
//     return rejectWithValue(error.response?.data || 'An error occurred')
//   }
// })

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: InitialMandatory,
  reducers: {
    setInquiry: (state, action: PayloadAction<ApiResponse>) => {
      return { ...state, ...action.payload }
    },
    resetInquiry: () => InitialMandatory
  }

  // extraReducers: builder => {
  //   builder.addCase(HitToInquiry.pending, state => {
  //     state.isLoading = true
  //     state.isError = false
  //   })
  //   builder.addCase(HitToInquiry.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
  //     state.isLoading = false
  //     Object.assign(state, action.payload)
  //   })
  //   builder.addCase(HitToInquiry.rejected, (state, action) => {
  //     state.isLoading = false
  //     state.isError = true
  //     state.responseMessage = action.payload as string
  //   })
  // }
})

const paymentSlice = createSlice({
  name: 'payment',
  initialState: InitialMandatory,
  reducers: {
    setPayment: (state, action: PayloadAction<ApiResponse>) => {
      return { ...state, ...action.payload }
    },
    resetPayment: () => InitialMandatory
  }

  // extraReducers: builder => {
  //   builder.addCase(HitToPayment.pending, state => {
  //     state.isLoading = true
  //     state.isError = false
  //   })
  //   builder.addCase(HitToPayment.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
  //     state.isLoading = false
  //     Object.assign(state, action.payload)
  //   })
  //   builder.addCase(HitToPayment.rejected, (state, action) => {
  //     state.isLoading = false
  //     state.isError = true
  //     state.responseMessage = action.payload as string
  //   })
  // }
})

// Export actions for dispatch
export const { setInquiry, resetInquiry } = inquirySlice.actions
export const { setPayment, resetPayment } = paymentSlice.actions

// Create Redux store
const store = configureStore({
  reducer: {
    inquiry: inquirySlice.reducer,
    payment: paymentSlice.reducer
  }
})

// Export types for usage in components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

// export { HitToInquiry, HitToPayment }
