import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SignInPage from '../pages/SignInPage/SignInPage';

describe('Page SignIn', () => {
  const renderComponent = (url: string) =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <SignInPage />
      </MemoryRouter>
    );

  it('should render SignInPage component successfully', () => {
    renderComponent('/');

    expect(screen.getByTestId('sign-in-page')).toBeInTheDocument();
  });

  it('should block the login button if validation fails', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');
    const btnSubmit = screen.getByText('Sign In');

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'test' } });
    });

    expect(btnSubmit).toBeDisabled();
  });

  it('should unlock the login button if validation is passed', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');
    const btnSubmit = screen.getByText('Sign In');

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'test@gmail.com' } });
    });

    await act(async () => {
      fireEvent.click(btnSubmit);
    });

    expect(btnSubmit).not.toBeDisabled();
  });
});
