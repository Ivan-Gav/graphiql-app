import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { useAppSelector } from 'src/hooks/redux';
import LangContextProvider from 'src/context/LangContext';
import { store } from 'src/store/store';
import DocBreadCrumbs from 'src/components/DocumentationExplorer/DocBreadCrumbs';
import * as modReduxHooks from 'src/hooks/redux';
import * as actions from 'src/store/slice/DocSlice';

describe('Doc component', () => {
  vi.mock('src/hooks/redux');

  const WrappedBCComponent = () => {
    return (
      <LangContextProvider>
        <Provider store={store}>
          <DocBreadCrumbs />
        </Provider>
      </LangContextProvider>
    );
  };

  it('bread crumb return null if length docPath less 2', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs'],
    });

    const { container } = render(<WrappedBCComponent />);

    expect(container.firstChild).toBeNull();
  });

  it('renders bread crumb link', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id'],
    });

    render(<WrappedBCComponent />);
    const bcLink = screen.getByRole('link', { name: 'User' });

    expect(bcLink).toBeVisible();
  });

  it('dispatches action when clicked', () => {
    vi.mocked(useAppSelector).mockReturnValue({
      docPath: ['Docs', 'User', 'id'],
    });
    const dispatch = vi.fn();
    const mockedDispatch = vi.spyOn(modReduxHooks, 'useAppDispatch');
    mockedDispatch.mockReturnValue(dispatch);

    const mockedSetPath = vi.spyOn(actions, 'setPath');

    render(<WrappedBCComponent />);
    const bcLink = screen.getByRole('link', { name: 'User' });

    fireEvent.click(bcLink);

    expect(dispatch).toHaveBeenCalled();
    expect(mockedSetPath).toHaveBeenCalledWith(['Docs', 'User']);
  });
});
