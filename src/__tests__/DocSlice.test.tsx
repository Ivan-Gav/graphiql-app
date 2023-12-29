import docReducer, {
  clearPath,
  closeDocs,
  DocState,
  openDocs,
  setPath,
} from 'src/store/slice/DocSlice';
import { describe, expect, it } from 'vitest';

const initialState: DocState = {
  docPath: ['Docs'],
  docsOpen: false,
};

describe('Doc slice', () => {
  it('should set path with "setPath" action', () => {
    const action = {
      type: setPath.type,
      payload: ['Test'],
    };

    const result = docReducer(initialState, action);

    expect(result).toEqual({ ...initialState, docPath: ['Test'] });
  });

  it('should clear path with "clearPath" action', () => {
    const action = {
      type: clearPath.type,
    };

    const result = docReducer({ ...initialState, docPath: ['Test'] }, action);

    expect(result).toEqual(initialState);
  });

  it('should open docs with "openDocs" action', () => {
    const action = {
      type: openDocs.type,
    };

    const result = docReducer(initialState, action);

    expect(result).toEqual({ ...initialState, docsOpen: true });
  });

  it('should close docs with "closeDocs" action', () => {
    const action = {
      type: closeDocs.type,
    };

    const result = docReducer({ ...initialState, docsOpen: true }, action);

    expect(result).toEqual({ ...initialState, docsOpen: false });
  });
});
