import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

// thunk to delete teacher from fire base (admin dashboard)
export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (teacherId) => {
    const teacherRef = doc(db, "teachers", teacherId);
    await deleteDoc(teacherRef);
    
    return teacherId;
  }
);

const initialState = {
  teachers: [],
  status: 'idle', 
  error: null 
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
      state.status = 'succeeded';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;