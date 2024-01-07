import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

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
}

const initialState: UserState = {
  isAuth: localStorage.getItem('isAuth') === 'true' || false,
  email: null,
};

export const fetchSignIn = createAsyncThunk(
  'user/signInWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem('isAuth', 'true');
    return { email: data.user.email };
  }
);
export const fetchSignUp = createAsyncThunk(
  'user/createUserWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    localStorage.setItem('isAuth', 'true');
    return { email: data.user.email };
  }
);

export const fetchSignOut = createAsyncThunk('user/signOut', async () => {
  await auth.signOut();
  localStorage.setItem('isAuth', 'false');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: { email: string | null } }) => {
      state.isAuth = !!payload.email;
      state.email = payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
    });
    builder.addCase(fetchSignOut.fulfilled, (state) => {
      state.isAuth = false;
      state.email = null;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
    });
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
