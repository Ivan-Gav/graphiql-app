import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';
import HeadersEditor from 'src/components/RequestMenu/HeadersEditor/HeadersEditor';

describe('HeadersEditor component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <HeadersEditor />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('@uiw/react-codemirror');

  it('should render HeadersEditor component successfully', () => {
    renderComponent('/');

    expect(screen.getByTestId('component-input-headers')).toBeInTheDocument();
  });

  it('should be pressed to open the input field', () => {
    renderComponent('/');

    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument();

    const listItem = screen.getByTestId('component-list-item');

    fireEvent.click(listItem);

    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandLessIcon')).not.toBeInTheDocument();
  });
});
