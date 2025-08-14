import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
// import bookedTeacherReducer from './BookedTeacherSlice';
export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    // bookedTeacher:bookedTeacherReducer
  },
});