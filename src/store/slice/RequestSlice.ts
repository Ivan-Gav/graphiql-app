import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from 'graphql';
import { RootState } from '../store';
import { T } from 'src/models/models';
export const EXAMPLE_REQUEST = `{
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
  variablesInputValue: string;
  errorMessageApi: string | null;
  errorMessage: string | null;
  responseString: string | null;
  isLoading: boolean;
}

const initialState: RequestState = {
  requestInputValue: EXAMPLE_REQUEST,
  headersInputValue: '',
  variablesInputValue: '',
  errorMessageApi: null,
  errorMessage: null,
  responseString: null,
  isLoading: false,
};

export const requestToApi = createAsyncThunk(
  'request/requestToApi',
  async ({ T }: { T: T }, { getState }) => {
    try {
      const {
        graphqlReducer: { urlApi },
        requestReducer: {
          headersInputValue,
          requestInputValue,
          variablesInputValue,
        },
      } = getState() as RootState;
      if (!urlApi) {
        throw new Error(T.NOT_SELECTED_API);
      }

      const newHeaders = headersInputValue ? JSON.parse(headersInputValue) : {};
      const newVariables = variablesInputValue
        ? JSON.parse(variablesInputValue)
        : {};

      const results = await fetch(urlApi, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          ...newHeaders,
        },

        body: JSON.stringify({
          query: requestInputValue,
          variables: newVariables,
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
    setRequestInputValue(state, { payload }: PayloadAction<string>) {
      state.requestInputValue = payload;
    },
    setHeadersInputValue(state, { payload }: PayloadAction<string>) {
      state.headersInputValue = payload;
    },
    setVariablesInputValue(state, { payload }: PayloadAction<string>) {
      state.variablesInputValue = payload;
    },
    deleteMessageError(state) {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestToApi.pending, (state) => {
        state.isLoading = true;
        state.errorMessageApi = null;
        state.responseString = null;
      })
      .addCase(requestToApi.rejected, (state, { error }) => {
        state.errorMessage = error.message || '';
        state.isLoading = false;
        state.responseString = null;
      })
      .addCase(requestToApi.fulfilled, (state, { payload }) => {
        state.errorMessageApi = null;
        if (payload.errors) {
          state.errorMessageApi = JSON.stringify(payload, null, 1);
        } else {
          state.responseString = JSON.stringify(payload, null, 1);
        }
        state.isLoading = false;
      });
  },
});

export const getRequestState = (state: RootState) => state.requestReducer;

export const {
  setHeadersInputValue,
  setRequestInputValue,
  setVariablesInputValue,
  deleteMessageError,
} = requestSlice.actions;

export default requestSlice.reducer;
