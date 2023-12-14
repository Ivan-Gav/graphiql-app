import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
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

export default responseSlice.reducer;
