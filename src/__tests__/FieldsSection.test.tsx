import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { schema } from './mockSchema';
import { Provider } from 'react-redux';
import { useAppSelector } from 'src/hooks/redux';
import LangContextProvider from 'src/context/LangContext';
import { store } from 'src/store/store';
import { CustomGraphQLType, FieldLinkProps } from 'src/models/models';
import FieldsSection from 'src/components/DocumentationExplorer/FieldsSection';

describe('FieldsSection component', () => {
  vi.mock('src/hooks/redux');

  vi.mocked(useAppSelector).mockReturnValue({
    docPath: ['Docs', 'User', 'id'],
  });

  const WrappedComponent = ({ type }: FieldLinkProps) => {
    return (
      <LangContextProvider>
        <Provider store={store}>
          <FieldsSection type={type} />
        </Provider>
      </LangContextProvider>
    );
  };

  it('renders fields and arguments from types', () => {
    const type = schema.getType('Query') as CustomGraphQLType;

    render(<WrappedComponent type={type} />);

    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('fieldsSection return null if type not found', () => {
    const type = schema.getType('Test') as CustomGraphQLType;

    const { container } = render(<WrappedComponent type={type} />);

    expect(container.firstChild).toBeNull();
  });
});
