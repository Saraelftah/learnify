import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

// 💡 1. دالة الـ Thunk لحذف طالب من Firestore
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    // 💡 قم بحذف المستند من مجموعة 'users'
    const studentRef = doc(db, "users", studentId);
    await deleteDoc(studentRef);

    // نُرجع الـ id ليتم استخدامه في المُعَدِّل
    return studentId;
  }
);

const initialState = {
  students: [],
  status: 'idle', // لإدارة حالة التحميل
  error: null // لإدارة الأخطاء
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // 💡 2. دالة الإجراء لتعيين جميع الطلاب
    setStudents: (state, action) => {
      state.students = action.payload;
      state.status = 'succeeded';
    },
  },
  // 💡 3. extraReducers للتعامل مع الإجراءات التي تأتي من الـ Thunk
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // 💡 حذف الطالب من الحالة المحلية بعد نجاح الحذف من Firebase
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