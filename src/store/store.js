import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';
import studentsReducer from "./StudentsSlice";
import usersReducer from "./UsersSlice"


export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    students: studentsReducer,
    users: usersReducer,
  },
});