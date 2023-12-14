import { combineReducers, configureStore } from '@reduxjs/toolkit';
import requestReducer from './reducers/RequestSlice';

const rootReducer = combineReducers({
  requestReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
