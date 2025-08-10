import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: []
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    }
  }
});

export const { setTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;

