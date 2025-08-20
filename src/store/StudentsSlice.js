import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// delete student from firebase
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    const studentRef = doc(db, "users", studentId);
    await deleteDoc(studentRef);
    return studentId;
  }
);

// add booking for a student
export const addBookingToStudent = createAsyncThunk(
  "students/addBookingToStudent",
  async ({ studentId, booking }) => {
    // Update the student's bookings in Firestore
    const studentRef = doc(db, "users", studentId);

    await updateDoc(studentRef, {
      bookings: [...(booking.bookings || []), booking],
    });

    return { studentId, booking };
  }
);

const initialState = {
  students: [], // every student will have{ id, name, email, bookings: [] }
  status: "idle",
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload.map((s) => ({
        ...s,
        bookings: s.bookings || [],
      }));
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
      })
      .addCase(addBookingToStudent.fulfilled, (state, action) => {
        const { studentId, booking } = action.payload;
        const student = state.students.find((s) => s.id === studentId);
        if (student) {
          student.bookings.push(booking);
        }
      });
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
