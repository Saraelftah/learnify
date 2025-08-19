import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// add booking to Firestore
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData) => {
    const docRef = await addDoc(collection(db, "bookings"), bookingData);
    return { id: docRef.id, ...bookingData };
  }
);

// fetch bookings from Firestore
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    let bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
          console.log("Fetched bookings:", action.payload);
        state.bookings = action.payload;
      });
  },
});
export default bookingsSlice.reducer;

