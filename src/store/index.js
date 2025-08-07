import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './bookingSlice';

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
  },
});