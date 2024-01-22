import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { schema } from './mockSchema';
import { Provider } from 'react-redux';
import { useAppSelector } from 'src/hooks/redux';
import LangContextProvider from 'src/context/LangContext';
import { store } from 'src/store/store';
import Doc from 'src/components/DocumentationExplorer/Doc';
import TEXT from 'src/constants/text';

describe('Doc component', () => {
  vi.mock('src/hooks/redux');

  const WrappedDocComponent = (props: { item: string }) => {
    return (
      <LangContextProvider>
        <Provider store={store}>
          <Doc schema={schema} item={props.item} />
        </Provider>
      </LangContextProvider>
    );
  };

  it('renders item id', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id'],
    });

    render(<WrappedDocComponent item="id" />);

    const itemTitle = screen.getByRole('heading', { level: 3 });

    expect(itemTitle).toHaveTextContent('id');
  });

  it('renders item User', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id'],
    });

    render(<WrappedDocComponent item="User" />);

    const itemTitle = screen.getByRole('heading', { level: 3 });

    expect(itemTitle).toHaveTextContent('User');
  });

  it("throws an error if type isn't found", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id'],
    });

    const r = () => render(<WrappedDocComponent item="nonono" />);

    expect(r).toThrowError(`${TEXT.EN.CANT_FIND_FIELD}"nonono"`);
  });

  it("throws an error if type isn't found", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id', 'title'],
    });

    const r = () => render(<WrappedDocComponent item="" />);

    expect(r).toThrowError(`${TEXT.EN.CANT_FIND_FIELD}""`);
  });
});
