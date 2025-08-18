import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
import bookingsReducer from './BookSlice';
export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    bookings: bookingsReducer, 
  },
});