import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ResponseState {
  responseString: string;
}

const initialState: ResponseState = {
  responseString: '',
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponseInputValue(state, action: PayloadAction<string>) {
      state.responseString = action.payload;
    },
  },
});

export const getResponseState = (state: RootState) => state.responseReducer;

export const { setResponseInputValue } = responseSlice.actions;

export default responseSlice.reducer;
