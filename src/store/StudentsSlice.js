import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

// delete student from firebase
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    // delete user from users firebase
    const studentRef = doc(db, "users", studentId);
    await deleteDoc(studentRef);

    return studentId;
  }
);

const initialState = {
  students: [],
  status: 'idle', 
  error: null 
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    
    setStudents: (state, action) => {
      state.students = action.payload;
      state.status = 'succeeded';
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;