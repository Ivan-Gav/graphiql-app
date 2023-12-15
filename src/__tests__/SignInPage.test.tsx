import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import SignInPage from '../pages/SignInPage/SignInPage';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';

describe('Page SignIn', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <SignInPage />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('firebase/auth');

  it('should render SignInPage component successfully', () => {
    renderComponent('/');

    expect(screen.getByTestId('sign-in-page')).toBeInTheDocument();
  });

  it('should block the login button if validation fails', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');
    const btnSubmit = screen.getByRole('button', { name: 'Sign In' });

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'test' } });
    });

    expect(btnSubmit).toBeDisabled();
  });

  it('should unlock the login button if validation is passed', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByRole('button', { name: 'Sign In' });

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.input(passwordInput, { target: { value: '123' } });
    });

    await act(async () => {
      fireEvent.click(btnSubmit);
    });

    expect(btnSubmit).not.toBeDisabled();
  });
});
