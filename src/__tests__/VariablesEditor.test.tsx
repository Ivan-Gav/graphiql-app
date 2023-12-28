import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { store } from '../store/store';
import LangContextProvider from 'src/context/LangContext';
import VariablesEditor from 'src/components/RequestMenu/VariablesEditor/VariablesEditor';
import TEXT from 'src/constants/text';

describe('VariablesEditor component', () => {
  const renderComponent = (url: string) =>
    render(
      <LangContextProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={[url]}>
            <VariablesEditor />
          </MemoryRouter>
        </Provider>
      </LangContextProvider>
    );

  vi.mock('@uiw/react-codemirror');

  it('should render VariablesEditor component successfully', () => {
    renderComponent('/');

    expect(screen.getByText(TEXT.EN.VARIABLES)).toBeInTheDocument();
  });

  it('should be pressed to open the input field', () => {
    renderComponent('/');

    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandLessIcon')).not.toBeInTheDocument();

    const listItem = screen.getByTestId('component-list-item');

    fireEvent.click(listItem);

    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument();
  });
});
