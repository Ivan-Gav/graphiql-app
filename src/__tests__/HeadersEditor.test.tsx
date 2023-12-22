import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';
import { useAppSelector } from 'src/hooks/redux';
import HeadersEditor from 'src/components/RequestMenu/HeadersEditor/HeadersEditor';

describe('HeadersEditor component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <HeadersEditor />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('src/hooks/redux');

  it('should render HeadersEditor component successfully', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isLoading: false, urlApi: '' });
    renderComponent('/');

    expect(screen.getByTestId('component-input-headers')).toBeInTheDocument();
  });
});
