import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from 'graphql';
import { RootState } from '../store';
import { T } from 'src/models/models';
const EXAMPLE_REQUEST = `{
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
`;

export interface RequestState {
  requestInputValue: string;
  headersInputValue: string;
  errorMessage: string | null;
  responseString: string | null;
  isLoading: boolean;
  headers: HeadersInit;
}

const initialState: RequestState = {
  requestInputValue: EXAMPLE_REQUEST,
  headersInputValue: '',
  errorMessage: null,
  responseString: null,
  isLoading: true,
  headers: new Headers(),
};

export const requestToApi = createAsyncThunk(
  'request/requestToApi',
  async ({ T }: { T: T }, { getState }) => {
    try {
      const {
        graphqlReducer: { urlApi },
        requestReducer: { headersInputValue, requestInputValue },
      } = getState() as RootState;
      if (!urlApi) {
        throw new Error(T.NOT_SELECTED_API);
      }

      const newHeaders = headersInputValue ? JSON.parse(headersInputValue) : {};

      const results = await fetch(urlApi, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          ...newHeaders,
        },

        body: JSON.stringify({
          query: requestInputValue,
        }),
      });

      const data = await results.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestInputValue(state, action: PayloadAction<string>) {
      state.requestInputValue = action.payload;
    },
    setHeadersInputValue(state, action: PayloadAction<string>) {
      state.headersInputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestToApi.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.responseString = null;
      })
      .addCase(requestToApi.rejected, (state, { error }) => {
        state.errorMessage = error.message || '';
        state.isLoading = false;
        state.responseString = null;
      })
      .addCase(requestToApi.fulfilled, (state, { payload }) => {
        state.errorMessage = null;
        state.responseString = JSON.stringify(payload);
        state.isLoading = false;
      });
  },
});

export const getRequestState = (state: RootState) => state.requestReducer;

export const { setHeadersInputValue } = requestSlice.actions;

export default requestSlice.reducer;
