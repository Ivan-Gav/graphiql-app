import { configureStore } from '@reduxjs/toolkit';
import graphqlReducer, {
  clearApiState,
  deleteMessageError,
  getIntrospection,
  GraphqlState,
} from 'src/store/slice/graphql.slice';

import { describe, expect, it, vi } from 'vitest';

const initialState: GraphqlState = {
  schemaApi: null,
  urlApi: null,
  isLoading: false,
  errorMessage: null,
};

describe('Graphql slice', () => {
  it('should clear state with "clearApiState" action', () => {
    const data = {
      schemaApi: null,
      urlApi: 'test',
      isLoading: true,
      errorMessage: 'test',
    };

    const action = {
      type: clearApiState.type,
    };

    const result = graphqlReducer(data, action);

    expect(result).toEqual(initialState);
  });

  it('should clear error message "deleteMessageError" action', () => {
    const action = {
      type: deleteMessageError.type,
    };

    const result = graphqlReducer(
      { ...initialState, errorMessage: 'Test' },
      action
    );

    expect(result).toEqual(initialState);
  });

  it('should write state if fulfilled with "getIntrospection" action', () => {
    const action = {
      type: getIntrospection.fulfilled.type,
      payload: {
        data: 'test',
      },
    };

    const result = graphqlReducer(initialState, action);

    expect(result).toEqual({ ...initialState, schemaApi: 'test' });
  });

  it('should clear state and write error if api not answer', async () => {
    const store = configureStore({
      reducer: {
        graphqlReducer,
      },
    });

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    expect(store.getState().graphqlReducer).toEqual({
      ...initialState,
      errorMessage: 'fetch failed',
    });
  });

  it('should write urlApi if fetch fulfilled', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => {
        return Promise.resolve({});
      },
    });

    const store = configureStore({
      reducer: {
        graphqlReducer,
      },
    });

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    expect(store.getState().graphqlReducer).toEqual({
      ...initialState,
      urlApi: 'https://test',
    });
  });

  it('should write error if fetch rejected', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      statusText: 'data rejected',
    });

    const store = configureStore({
      reducer: {
        graphqlReducer,
      },
    });

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    expect(store.getState().graphqlReducer).toEqual({
      ...initialState,
      errorMessage: 'data rejected',
    });
  });

  it('should error if fetch rejected', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });

    const store = configureStore({
      reducer: {
        graphqlReducer,
      },
    });

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    expect(store.getState().graphqlReducer).toEqual({
      ...initialState,
    });
  });
});
