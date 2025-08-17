import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
import studentsReducer from "./StudentsSlice"
import bookingsReducer from './BookSlice';


export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    students: studentsReducer,
    bookings: bookingsReducer, 
  },
});