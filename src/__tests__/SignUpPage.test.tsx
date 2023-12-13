import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { store } from '../store/store';
import { VALIDATION_MESSAGE } from '../utils/yup/schemaValidationSignUp';

describe('Page SignUp', () => {
  const renderComponent = (url: string) =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

  vi.mock('firebase/auth');

  it('should render SignUpPage component successfully', () => {
    renderComponent('/');

    expect(screen.getByTestId('sign-up-page')).toBeInTheDocument();
  });

  it('should check first name validation', async () => {
    renderComponent('/');

    const firstNameInput = screen.getByTestId('first-name-input');

    expect(
      screen.queryByText(VALIDATION_MESSAGE.firstName)
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'firstname' } });
    });

    expect(screen.getByText(VALIDATION_MESSAGE.firstName)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'Firstname' } });
    });

    expect(
      screen.queryByText(VALIDATION_MESSAGE.firstName)
    ).not.toBeInTheDocument();
  });

  it('should check last name validation', async () => {
    renderComponent('/');

    const lastNameInput = screen.getByTestId('last-name-input');

    expect(
      screen.queryByText(VALIDATION_MESSAGE.lastName)
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(lastNameInput, { target: { value: 'lastname' } });
    });

    expect(screen.getByText(VALIDATION_MESSAGE.lastName)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(lastNameInput, { target: { value: 'Lastname' } });
    });

    expect(
      screen.queryByText(VALIDATION_MESSAGE.lastName)
    ).not.toBeInTheDocument();
  });

  it('should check email validation', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');

    expect(
      screen.queryByText(VALIDATION_MESSAGE.email.valid)
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'email' } });
    });

    expect(
      screen.getByText(VALIDATION_MESSAGE.email.valid)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'email@gmail.com' } });
    });

    expect(
      screen.queryByText(VALIDATION_MESSAGE.email.valid)
    ).not.toBeInTheDocument();
  });

  it('should check strength password validation', async () => {
    renderComponent('/');

    const passwordInput = screen.getByTestId('password-input');

    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.strength)
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: 'password' } });
    });

    expect(
      screen.getByText(VALIDATION_MESSAGE.password.strength)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwert1' } });
    });

    expect(
      screen.getByText(VALIDATION_MESSAGE.password.length)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
    });

    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.strength)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.length)
    ).not.toBeInTheDocument();
  });

  it('should check length and strength password validation', async () => {
    renderComponent('/');

    const passwordInput = screen.getByTestId('password-input');

    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.strength)
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: 'password' } });
    });

    expect(
      screen.getByText(VALIDATION_MESSAGE.password.strength)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwert1' } });
    });

    expect(
      screen.getByText(VALIDATION_MESSAGE.password.length)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
    });

    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.strength)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(VALIDATION_MESSAGE.password.length)
    ).not.toBeInTheDocument();
  });

  it('should block the SignUp button if validation fails', async () => {
    renderComponent('/');

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    const btnSubmit = screen.getByText('Sign Up');

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'Firstname' } });
      fireEvent.input(lastNameInput, { target: { value: 'Lastname' } });
      fireEvent.input(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
    });

    expect(btnSubmit).toBeDisabled();
  });

  it('should unlock the login button if validation is passed', async () => {
    renderComponent('/');

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const rulesInput = screen.getByTestId('rules-input');

    const btnSubmit = screen.getByText('Sign Up');

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'Firstname' } });
      fireEvent.input(lastNameInput, { target: { value: 'Lastname' } });
      fireEvent.input(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
      fireEvent.click(rulesInput);
    });

    await act(async () => {
      fireEvent.click(btnSubmit);
    });

    expect(btnSubmit).not.toBeDisabled();
  });
});
