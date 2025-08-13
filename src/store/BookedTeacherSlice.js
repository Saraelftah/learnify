import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTeacher: JSON.parse(localStorage.getItem("selectedTeacher")) || null,
};

const bookedTeacherSlice = createSlice({
  name: "bookedTeacher",
  initialState,
  reducers: {
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
      localStorage.setItem("selectedTeacher", JSON.stringify(action.payload));
    },
    clearSelectedTeacher: (state) => {
      state.selectedTeacher = null;
      localStorage.removeItem("selectedTeacher");
    },
  },
});

export const { setSelectedTeacher, clearSelectedTeacher } = bookedTeacherSlice.actions;
export default bookedTeacherSlice.reducer;
