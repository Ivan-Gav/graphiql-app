import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user.slice';
import requestReducer from './slice/RequestSlice';
import variablesReducer from './slice/VariablesSlice';
import responseReducer from './slice/ResponseSlice';
import graphqlReducer from './slice/graphql.slice';

export const store = configureStore({
  reducer: {
    userReducer,
    requestReducer,
    variablesReducer,
    responseReducer,
    graphqlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
