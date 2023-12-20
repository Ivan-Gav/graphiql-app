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
    clearPath(state) {
      state.docPath = initialState.docPath;
    },
  },
});

export const { setPath, clearPath } = docSlice.actions;
export default docSlice.reducer;
