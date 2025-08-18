import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../../firebase';

// Async Thunk to get all users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const usersCollection = collection(db, 'users');
    const data = await getDocs(usersCollection);
    const usersData = data.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersData;
  }
);

// Async Thunk to sign out from firebase
export const signOutUser = createAsyncThunk(
  'users/signOutUser',
  async () => {
    const auth = getAuth();
    await signOut(auth);
  }
);

const initialState = {
  teachers: [],
  students: [],
  admins: [],
  currentUser: null, 
  status: 'idle', 
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    //logout user from redux
  },
  extraReducers: (builder) => {
    builder
      //fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const users = action.payload;
        state.teachers = users.filter(user => user.role === 'teacher');
        state.students = users.filter(user => user.role === 'student');
        state.admins = users.filter(user => user.role === 'admin');
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(signOutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = 'idle';
      });
  },
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;