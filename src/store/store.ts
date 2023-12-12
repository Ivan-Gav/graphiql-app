import { configureStore } from '@reduxjs/toolkit';
import useReducer from './slice/user.slice';

// const rootReducer = combineReducers({
//   useReducer,
// });

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//   });
// };

export const store = configureStore({
  reducer: {
    useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
