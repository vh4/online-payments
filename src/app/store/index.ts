import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialMandatory, MandatoryInterface } from './interface/mandatory';

// Inquiry Slice
const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: InitialMandatory,
  reducers: {
    setInquiry: (state, action: PayloadAction<MandatoryInterface>) => {
      return { ...state, ...action.payload };
    },
    resetInquiry: () => InitialMandatory,
  },
});

// Payment Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState: InitialMandatory,
  reducers: {
    setPayment: (state, action: PayloadAction<MandatoryInterface>) => {
      return { ...state, ...action.payload };
    },
    resetPayment: () => InitialMandatory,
  },
});

// Export actions for dispatch
export const { setInquiry, resetInquiry } = inquirySlice.actions;
export const { setPayment, resetPayment } = paymentSlice.actions;

// Create Redux store
const store = configureStore({
  reducer: {
    inquiry: inquirySlice.reducer,
    payment: paymentSlice.reducer,
  },
});

// Export types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
