import { configureStore } from '@reduxjs/toolkit';
import teachersReducer from './TeachersSlice';

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
  },
});