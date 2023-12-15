import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.slice';
import requestReducer from './slice/RequestSlice';
import responseReducer from './slice/ResponseSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    requestReducer,
    responseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
