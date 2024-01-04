import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as modReduxHooks from 'src/hooks/redux';

import Header from '../components/Header/Header';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { useAppSelector } from '../hooks/redux';
import LangContextProvider from '../context/LangContext';

const TestHeader = () => {
  return (
    <LangContextProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path={'/'}
              element={
                <>
                  <Header />
                  <div>Main Page</div>
                </>
              }
            />
            <Route
              path={'/graphiql'}
              element={
                <>
                  <Header />
                  <div data-testid="test-page">Graphiql Page</div>
                </>
              }
            />
            <Route
              path={'/signin'}
              element={
                <>
                  <Header />
                  <div data-testid="test-page">Signin Page</div>
                </>
              }
            />
            <Route
              path={'/signup'}
              element={
                <>
                  <Header />
                  <div data-testid="test-page">Signup Page</div>
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    </LangContextProvider>
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

    const signInLink = screen.getByRole('link', { name: 'Sign In' });

    expect(signInLink).toHaveAttribute('href', '/signin');
  });

  it('renders Sign Up button', () => {
    render(<TestHeader />);

    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });

    expect(signUpLink).toHaveAttribute('href', '/signup');
  });

  it('renders Sign Out button', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: true });

    render(<TestHeader />);

    const signUpLink = screen.getByRole('link', { name: 'Sign Out' });

    expect(signUpLink).toHaveAttribute('href', '/');
  });

  it('should to press SignOut to sign out', () => {
    const spy = vi
      .spyOn(modReduxHooks, 'useAppDispatch')
      .mockImplementation(vi.fn);

    vi.mocked(useAppSelector).mockReturnValue({ isAuth: true });

    render(<TestHeader />);

    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByTestId('LogoutIcon'));

    expect(spy).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('menu-item-signout'));

    expect(spy).toHaveBeenCalled();
  });

  it('should click on the GraphQl link to go to the page', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: true });

    render(<TestHeader />);

    fireEvent.click(screen.getByTestId('menu-item-welcome'));
    fireEvent.click(screen.getByTestId('menu-item-graphql'));

    expect(screen.getByText('Graphiql Page')).toBeInTheDocument();
  });

  it('should click on the Signin link to go to the page', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: false });

    render(<TestHeader />);

    fireEvent.click(screen.getByTestId('menu-item-signin'));

    expect(screen.getByText('Signin Page')).toBeInTheDocument();
  });

  it('should click on the SignUp link to go to the page', () => {
    vi.mocked(useAppSelector).mockReturnValue({ isAuth: false });

    render(<TestHeader />);

    fireEvent.click(screen.getByTestId('menu-item-signup'));

    expect(screen.getByText('Signup Page')).toBeInTheDocument();
  });
});
