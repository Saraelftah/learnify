import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
import studentsReducer from "./StudentsSlice";
import usersReducer from "./UsersSlice"
// import bookingsReducer from './BookSlice';


export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    students: studentsReducer,
    users: usersReducer,
    // bookings: bookingsReducer, 
  },
});