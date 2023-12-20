import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  docPath: ['Docs'],
};

export const docSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath(state, action: PayloadAction<string[]>) {
      state.docPath = action.payload;
    },
  },
});

export const { setPath } = docSlice.actions;
export default docSlice.reducer;
