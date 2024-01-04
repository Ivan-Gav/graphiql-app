import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { createContext } from 'react';
import { LangContextType } from 'src/models/models';
import { useLangContext } from 'src/context/useLangContext';

describe('Doc component', () => {
  const FakeComponents = () => {
    useLangContext();
    return <div />;
  };

  const LangContext = createContext<LangContextType | null>(null);

  const WrappedDocComponent = () => {
    return (
      <LangContext.Provider value={null}>
        <FakeComponents />
      </LangContext.Provider>
    );
  };

  it('throws an error if context null', () => {
    const result = () => render(<WrappedDocComponent />);

    expect(result).toThrowError(
      `useLangContext must be used within a LangContextProvider`
    );
  });
});
