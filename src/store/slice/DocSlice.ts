import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface DocState {
  docPath: string[];
  docsOpen: boolean;
}

const initialState: DocState = {
  docPath: ['Docs'],
  docsOpen: false,
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
    openDocs(state) {
      state.docsOpen = true;
    },
    closeDocs(state) {
      state.docsOpen = false;
    },
  },
});

export const getDocState = (state: RootState) => state.docReducer;
export const { setPath, clearPath, openDocs, closeDocs } = docSlice.actions;
export default docSlice.reducer;
