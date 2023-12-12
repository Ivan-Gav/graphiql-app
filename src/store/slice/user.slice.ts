import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyArlI68HLkDCOZd_oPtBrEsJ-axvU8uIGY',
  authDomain: 'graphiql-98687.firebaseapp.com',
  projectId: 'graphiql-98687',
  storageBucket: 'graphiql-98687.appspot.com',
  messagingSenderId: '332315397269',
  appId: '1:332315397269:web:0c4298fc43caa6ed015f9c',
  measurementId: 'G-9E33XGMLGY',
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

export const getUser = (state: RootState) => state.useReducer;

export default userSlice.reducer;
