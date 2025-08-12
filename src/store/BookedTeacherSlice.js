import { createSlice } from "@reduxjs/toolkit";

const bookedTeacherSlice = createSlice({
  name: "booking",
  initialState: {
    selectedTeacher: null,
  },
  reducers: {
    setBookingTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    clearBookingTeacher: (state) => {
      state.selectedTeacher = null;
    },
  },
});

export const { setBookingTeacher, clearBookingTeacher } = bookedTeacherSlice.actions;
export default bookedTeacherSlice.reducer;
