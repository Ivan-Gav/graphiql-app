import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  requestInputValue: `{
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
`,
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestInputValue(state, action: PayloadAction<string>) {
      state.requestInputValue = action.payload;
    },
  },
});

export default requestSlice.reducer;
