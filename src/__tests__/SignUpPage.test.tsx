import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LangContextProvider from 'src/context/LangContext';
import TEXT from 'src/constants/text';

describe('Page SignUp', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <MemoryRouter initialEntries={[url]}>
          <SignUpPage />
        </MemoryRouter>
      </LangContextProvider>
    );

  const T = TEXT.EN;

  it('should render SignUpPage component successfully', () => {
    renderComponent('/');

    expect(screen.getByTestId('sign-up-page')).toBeInTheDocument();
  });

  it('should check first name validation', async () => {
    renderComponent('/');

    const firstNameInput = screen.getByTestId('first-name-input');

    expect(screen.queryByText(T.YUP_FIRST_LETTER)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'firstname' } });
    });

    expect(screen.getByText(T.YUP_FIRST_LETTER)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(firstNameInput, { target: { value: 'Firstname' } });
    });

    expect(screen.queryByText(T.YUP_FIRST_LETTER)).not.toBeInTheDocument();
  });

  it('should check last name validation', async () => {
    renderComponent('/');

    const lastNameInput = screen.getByTestId('last-name-input');

    expect(screen.queryByText(T.YUP_FIRST_LETTER)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(lastNameInput, { target: { value: 'lastname' } });
    });

    expect(screen.getByText(T.YUP_FIRST_LETTER)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(lastNameInput, { target: { value: 'Lastname' } });
    });

    expect(screen.queryByText(T.YUP_FIRST_LETTER)).not.toBeInTheDocument();
  });

  it('should check email validation', async () => {
    renderComponent('/');

    const emailInput = screen.getByTestId('email-input');

    expect(screen.queryByText(T.YUP_EMAIL_INVALID)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'email' } });
    });

    expect(screen.getByText(T.YUP_EMAIL_INVALID)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(emailInput, { target: { value: 'email@gmail.com' } });
    });

    expect(screen.queryByText(T.YUP_EMAIL_INVALID)).not.toBeInTheDocument();
  });

  it('should check strength password validation', async () => {
    renderComponent('/');

    const passwordInput = screen.getByTestId('password-input');

    expect(screen.queryByText(T.YUP_PASS_STRENGTH)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: 'password' } });
    });

    expect(screen.getByText(T.YUP_PASS_STRENGTH)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwert1' } });
    });

    expect(screen.getByText(T.YUP_PASS_LENGTH)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
    });

    expect(screen.queryByText(T.YUP_PASS_LENGTH)).not.toBeInTheDocument();
    expect(screen.queryByText(T.YUP_PASS_LENGTH)).not.toBeInTheDocument();
  });

  it('should check length and strength password validation', async () => {
    renderComponent('/');

    const passwordInput = screen.getByTestId('password-input');

    expect(screen.queryByText(T.YUP_PASS_STRENGTH)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: 'password' } });
    });

    expect(screen.getByText(T.YUP_PASS_STRENGTH)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwert1' } });
    });

    expect(screen.getByText(T.YUP_PASS_LENGTH)).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordInput, { target: { value: '@Qwerty123' } });
    });

    expect(screen.queryByText(T.YUP_PASS_STRENGTH)).not.toBeInTheDocument();
    expect(screen.queryByText(T.YUP_PASS_LENGTH)).not.toBeInTheDocument();
  });

  it('should block the SignUp button if validation fails', async () => {
    renderComponent('/');

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    const btnSubmit = screen.getByRole('button', { name: 'Sign Up' });

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

    const btnSubmit = screen.getByRole('button', { name: 'Sign Up' });

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
