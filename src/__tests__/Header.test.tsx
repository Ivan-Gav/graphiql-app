import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { useAppSelector } from '../hooks/redux';

const TestHeader = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
};

describe('Header', () => {
  vi.mock('../hooks/redux');

  it('renders link to the main page', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: false });

    render(<TestHeader />);

    const mainPageLink = screen.getByRole('link', { name: 'Welcome' });

    expect(mainPageLink).toHaveAttribute('href', '/');
  });

  it('renders link to the editor page', () => {
    render(<TestHeader />);

    const editorPageLink = screen.getByRole('link', { name: 'GraphiQL' });

    expect(editorPageLink).toHaveAttribute('href', '/graphiql');
  });

  it('renders Sign In button', () => {
    render(<TestHeader />);

    const signInLink = screen.getByRole('link', { name: 'SignIn' });

    expect(signInLink).toHaveAttribute('href', '/signin');
  });

  it('renders Sign Up button', () => {
    render(<TestHeader />);

    const signUpLink = screen.getByRole('link', { name: 'SignUp' });

    expect(signUpLink).toHaveAttribute('href', '/signup');
  });

  it('renders Sign Out button', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: true });

    render(<TestHeader />);

    const signUpLink = screen.getByRole('link', { name: 'SignOut' });

    expect(signUpLink).toHaveAttribute('href', '/');
  });
});
