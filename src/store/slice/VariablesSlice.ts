import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  variablesInputValue: '',
};

export const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariablesInputValue(state, action: PayloadAction<string>) {
      state.variablesInputValue = action.payload;
    },
  },
});

export default variablesSlice.reducer;
