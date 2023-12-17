import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders Fallback with error message when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('This is the test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const fallback = screen.getByTestId('fallback');
    const errorMessage = screen.getByRole('heading', {
      level: 1,
      name: 'This is the test Error',
    });

    expect(fallback).toBeVisible;
    expect(errorMessage).toBeVisible;
  });

  it('renders default error message when an error w/o message is thrown', () => {
    const ThrowError = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByRole('heading', {
      level: 1,
      name: 'Something went wrong...',
    });

    expect(errorMessage).toBeVisible;
  });
});
