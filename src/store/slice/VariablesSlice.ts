import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  variablesString: '',
};

export const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    setVariablesInputValue(state, action: PayloadAction<string>) {
      state.variablesString = action.payload;
    },
  },
});

export default variablesSlice.reducer;
