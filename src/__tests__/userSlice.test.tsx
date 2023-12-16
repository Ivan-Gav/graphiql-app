import { configureStore } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { describe, expect, it, vi } from 'vitest';
import userReducer, {
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
  setUser,
  UserState,
} from '../store/slice/user.slice';
import { mockResponseUserData } from './mockResponseUserData';

const initialState: UserState = {
  email: null,
  isAuth: false,
};

describe('User slice', () => {
  vi.mock('firebase/auth');

  it('should auth user with "setUser" action', () => {
    const user = {
      email: 'example@gmail.com',
    };

    const action = {
      type: setUser.type,
      payload: user,
    };

    const result = userReducer(initialState, action);

    expect(result).toEqual({ ...user, isAuth: true });
  });

  it('should logout user with "fetchSignOut" action', () => {
    const action = {
      type: fetchSignOut.fulfilled.type,
    };

    const result = userReducer(initialState, action);

    expect(result).toEqual({
      isAuth: false,
      email: null,
    });
  });

  it('should auth user with "fetchSignIn" action', async () => {
    vi.mocked(signInWithEmailAndPassword).mockReturnValue(
      new Promise((resolve) => {
        const user = {
          email: 'example@gmail.com',
          photoURL: 'http//avatar',
        };
        resolve({
          ...mockResponseUserData,
          user: { ...mockResponseUserData.user, ...user },
        });
      })
    );

    const store = configureStore({
      reducer: {
        userReducer,
      },
    });

    await store.dispatch(
      fetchSignIn({
        email: 'example@gmail.com',
        password: '123',
      })
    );

    expect(store.getState().userReducer).toEqual({
      isAuth: true,
      email: 'example@gmail.com',
    });
  });

  it('should sign up user with "fetchSignUp" action', async () => {
    vi.mocked(createUserWithEmailAndPassword).mockReturnValue(
      new Promise((resolve) => {
        const user = {
          email: 'example@gmail.com',
        };
        resolve({
          ...mockResponseUserData,
          user: { ...mockResponseUserData.user, ...user },
        });
      })
    );

    const store = configureStore({
      reducer: {
        userReducer,
      },
    });

    await store.dispatch(
      fetchSignUp({
        email: 'example@gmail.com',
        password: '123',
      })
    );

    expect(store.getState().userReducer).toEqual({
      isAuth: true,
      email: 'example@gmail.com',
    });
  });
});
