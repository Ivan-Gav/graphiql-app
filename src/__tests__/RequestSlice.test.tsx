import { configureStore } from '@reduxjs/toolkit';
import TEXT from 'src/constants/text';
import requestReducer, {
  EXAMPLE_REQUEST,
  RequestState,
  requestToApi,
  setHeadersInputValue,
  setRequestInputValue,
} from 'src/store/slice/RequestSlice';
import graphqlReducer, {
  getIntrospection,
} from 'src/store/slice/graphql.slice';
import { describe, expect, it, vi } from 'vitest';

const initialState: RequestState = {
  requestInputValue: EXAMPLE_REQUEST,
  headersInputValue: '',
  errorMessage: null,
  responseString: null,
  isLoading: true,
};

describe('Request slice', () => {
  it('should set request input value with "setRequestInputValue" action', () => {
    const action = {
      type: setRequestInputValue.type,
      payload: 'Test',
    };

    const result = requestReducer(initialState, action);

    expect(result).toEqual({ ...initialState, requestInputValue: 'Test' });
  });

  it('should set headers input value with "setHeadersInputValue" action', () => {
    const action = {
      type: setHeadersInputValue.type,
      payload: 'Test',
    };

    const result = requestReducer(initialState, action);

    expect(result).toEqual({ ...initialState, headersInputValue: 'Test' });
  });

  it('should write error if API not selected ', async () => {
    const store = configureStore({
      reducer: {
        graphqlReducer,
        requestReducer,
      },
    });

    await store.dispatch(
      requestToApi({
        T: {
          ...TEXT.EN,
        },
      })
    );

    expect(store.getState().requestReducer).toEqual({
      ...initialState,
      errorMessage: TEXT.EN.NOT_SELECTED_API,
      isLoading: false,
    });
  });

  it('should write error if fetch rejected', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => {
        return Promise.resolve({});
      },
    });

    const store = configureStore({
      reducer: {
        graphqlReducer,
        requestReducer,
      },
    });

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      statusText: 'data rejected',
    });

    await store.dispatch(
      requestToApi({
        T: {
          ...TEXT.EN,
        },
      })
    );

    expect(store.getState().requestReducer).toEqual({
      ...initialState,
      errorMessage: 'data rejected',
      isLoading: false,
    });

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      statusText: undefined,
    });

    await store.dispatch(
      requestToApi({
        T: {
          ...TEXT.EN,
        },
      })
    );

    expect(store.getState().requestReducer).toEqual({
      ...initialState,
      errorMessage: '',
      isLoading: false,
    });
  });

  it('should write data if fetch fulfilled', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => {
        return Promise.resolve({});
      },
    });

    const store = configureStore({
      reducer: {
        graphqlReducer,
        requestReducer,
      },
    });

    store.dispatch(setHeadersInputValue('{ "headers": "test" }'));

    await store.dispatch(
      getIntrospection({
        api: 'https://test',
      })
    );

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => {
        return Promise.resolve('Test');
      },
    });

    await store.dispatch(
      requestToApi({
        T: {
          ...TEXT.EN,
        },
      })
    );

    expect(store.getState().requestReducer).toEqual({
      ...initialState,
      responseString: JSON.stringify('Test'),
      headersInputValue: '{ "headers": "test" }',
      isLoading: false,
    });
  });
});
