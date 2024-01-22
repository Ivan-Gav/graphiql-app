import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';
import InputApi from 'src/components/InputApi/InputApi';
import { useAppSelector } from 'src/hooks/redux';
import * as modReduxHooks from 'src/hooks/redux';

describe('InputApi component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <InputApi />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('src/hooks/redux');

  it('should render InputApi component successfully', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isLoading: false, urlApi: '' });
    renderComponent('/');

    expect(screen.getByTestId('component-input-api')).toBeInTheDocument();
    expect(screen.getByTestId('btn-submit-api')).toBeInTheDocument();
  });

  it('should handle the submit button', async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isLoading: false,
      urlApi: 'https://test',
    });

    const spy = vi
      .spyOn(modReduxHooks, 'useAppDispatch')
      .mockImplementation(vi.fn);
    renderComponent('/');

    const btnSubmit = screen.getByTestId('btn-submit-api');

    fireEvent.click(btnSubmit);

    expect(spy).toHaveBeenCalled();
  });

  it('should unlock the submit button if api loading', async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      isLoading: true,
      urlApi: 'https://test',
    });
    renderComponent('/');

    const btnSubmit = screen.getByTestId('btn-submit-api');

    expect(btnSubmit).toBeDisabled();
  });
});
