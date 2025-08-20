import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

// add booking to the students
export const bookAppointment = createAsyncThunk(
  "students/bookAppointment",
  async ({ studentId, teacherId, appointmentDate }) => {
    const studentRef = doc(db, "students", studentId);
    
    await updateDoc(studentRef, {
      bookings: arrayUnion({ //adding elements to an array
        teacherId: teacherId,
        date: appointmentDate,
        status: 'pending',
        bookedAt: new Date().toISOString()
      })
    });
    
    return { studentId, booking: { teacherId, date: appointmentDate, status: 'pending' } };
  }
);


// delete student (admin dashboard)
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    const studentRef = doc(db, "students", studentId);
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
      //  deleteStudent status
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
      
      // status of booking
      .addCase(bookAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // update bookink status
        const student = state.students.find(s => s.id === action.payload.studentId);
        if (student) {
          if (!student.bookings) {
            student.bookings = [];
          }
          student.bookings.push(action.payload.booking);
        }
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;