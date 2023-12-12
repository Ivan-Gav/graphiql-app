import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
  measurementId: import.meta.env.VITE_API_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export interface UserState {
  isAuth: boolean;
  email: string | null;
  avatar: string | null;
  errorMessage: string | null;
  errorCode: string | null;
}

const initialState: UserState = {
  isAuth: false,
  email: null,
  avatar: null,
  errorMessage: null,
  errorCode: null,
};

export const fetchSignIn = createAsyncThunk(
  'user/signInWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return { email: data.user.email, avatar: data.user.photoURL };
  }
);

export const fetchSignOut = createAsyncThunk('user/signOut', async () => {
  await auth.signOut();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: { payload: { email: string | null; avatar: string | null } }
    ) => {
      state.isAuth = !!payload.email;
      state.email = payload.email;
      state.avatar = payload.avatar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.errorMessage = null;
        state.errorCode = null;
        state.isAuth = true;
        state.email = action.payload.email;
        state.avatar = action.payload.avatar;
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.isAuth = false;
        state.email = null;
        state.avatar = null;
        state.errorMessage = action.error.message || null;
        state.errorCode = action.error.code || null;
      });
    builder
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.isAuth = false;
        state.email = null;
        state.avatar = null;
        state.errorMessage = null;
        state.errorCode = null;
      })
      .addCase(fetchSignOut.rejected, (state, action) => {
        state = { ...state };
        state.errorMessage = action.error.message || null;
        state.errorCode = action.error.code || null;
      });
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
