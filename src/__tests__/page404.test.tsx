import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Page404 from '../pages/404/404';

describe('Page 404', () => {
  const renderComponent = (url: string) =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="" element={<>Home Page</>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>
    );

  it('should render Page404 when accessing a non-existent route', () => {
    renderComponent('/');

    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();

    cleanup();

    renderComponent('/test');

    expect(screen.getByTestId('page-404')).toBeInTheDocument();
    expect(screen.queryByText('Home Page')).not.toBeInTheDocument();
  });

  it('should navigate to Home Page when clicking the "btn-home" button on 404 page', () => {
    renderComponent('/test');

    expect(screen.getByTestId('page-404')).toBeInTheDocument();
    expect(screen.queryByText('Home Page')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('btn-home'));

    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
