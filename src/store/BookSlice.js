import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [], 
  },
  reducers: {
    addBooking: (state, action) => {
      state.items.push(action.payload);
    },
    clearBookings: (state) => {
      state.items = [];
    },
  },
});

export const { addBooking, clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
