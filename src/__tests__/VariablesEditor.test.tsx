import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';
import { useAppSelector } from 'src/hooks/redux';
import VariablesEditor from 'src/components/RequestMenu/VariablesEditor/VariablesEditor';

describe('VariablesEditor component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <VariablesEditor />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('src/hooks/redux');

  it('should render VariablesEditor component successfully', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isLoading: false, urlApi: '' });
    renderComponent('/');

    expect(screen.getByTestId('component-input-variables')).toBeInTheDocument();
  });
});
