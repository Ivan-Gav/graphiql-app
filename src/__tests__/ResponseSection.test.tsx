import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LangContextProvider from 'src/context/LangContext';
import { useAppSelector } from 'src/hooks/redux';
import { store } from 'src/store/store';
import ResponseSection from 'src/components/ResponseSection/ResponseSection';

describe('ResponseSection component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <ResponseSection />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('@uiw/react-codemirror');
  vi.mock('src/hooks/redux');

  it('should render ResponseSection component successfully', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      responseString: '',
      errorMessageApi: '',
      errorMessage: '',
    });
    renderComponent('/');

    expect(
      screen.getByTestId('response-section-component')
    ).toBeInTheDocument();
  });

  it('should give an error message', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      responseString: '',
      errorMessageApi: '',
      errorMessage: 'Error test!',
    });

    renderComponent('/');

    expect(screen.getByText('Error test!')).toBeInTheDocument();
  });
});
