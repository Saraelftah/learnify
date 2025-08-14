import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
<<<<<<< HEAD
// import bookedTeacherReducer from './BookedTeacherSlice';
export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    // bookedTeacher:bookedTeacherReducer
=======
import bookedTeacherReducer from './BookedTeacherSlice';
export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    bookedTeacher:bookedTeacherReducer
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
  },
});