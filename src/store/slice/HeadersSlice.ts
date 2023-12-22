import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  headersInputValue: '',
};

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeadersInputValue(state, action: PayloadAction<string>) {
      state.headersInputValue = action.payload;
    },
  },
});

export default headersSlice.reducer;
