import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { RootState } from '../store';

export interface GraphqlState {
  schemaApi: IntrospectionQuery | null;
  urlApi: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: GraphqlState = {
  schemaApi: null,
  urlApi: null,
  isLoading: false,
  errorMessage: null,
};

export const getIntrospection = createAsyncThunk(
  'graphql/getIntrospection',
  async ({ api }: { api: string }) => {
    try {
      const result = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });

      if (result.ok) {
        const { data } = await result.json();
        return { data: data as IntrospectionQuery, urlApi: api };
      }

      throw new Error(result.statusText);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    clearApiState: () => ({
      isLoading: false,
      schemaApi: null,
      urlApi: null,
      errorMessage: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIntrospection.pending, (state) => {
        state.isLoading = true;
        state.schemaApi = null;
        state.urlApi = null;
        state.errorMessage = null;
      })
      .addCase(getIntrospection.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || null;
      })
      .addCase(getIntrospection.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        schemaApi: action.payload?.data || null,
        urlApi: action.payload?.urlApi || null,
      }));
  },
});

export const getGraphqlState = (state: RootState) => state.graphqlReducer;

export const { clearApiState } = graphqlSlice.actions;

export default graphqlSlice.reducer;
