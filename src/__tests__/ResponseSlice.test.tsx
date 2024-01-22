import responseReducer, {
  ResponseState,
  setResponseInputValue,
} from 'src/store/slice/ResponseSlice';
import { describe, expect, it } from 'vitest';

const initialState: ResponseState = {
  responseString: '',
};

describe('Response slice', () => {
  it('should set input value with "setResponseInputValue" action', () => {
    const action = {
      type: setResponseInputValue.type,
      payload: 'Test',
    };

    const result = responseReducer(initialState, action);

    expect(result).toEqual({ responseString: 'Test' });
  });
});
