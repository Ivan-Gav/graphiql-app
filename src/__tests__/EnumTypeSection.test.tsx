import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { schema } from './mockSchema';
import { Provider } from 'react-redux';
import LangContextProvider from 'src/context/LangContext';
import { store } from 'src/store/store';
import EnumTypeSection from 'src/components/DocumentationExplorer/EnumTypeSection';
import { GraphQLEnumType } from 'graphql';

describe('EnumTypeSection component', () => {
  const WrappedComponent = ({ type }: { type: GraphQLEnumType }) => {
    return (
      <LangContextProvider>
        <Provider store={store}>
          <EnumTypeSection type={type} />
        </Provider>
      </LangContextProvider>
    );
  };

  it('EnumTypeSection renders enum types', () => {
    const type = schema.getType('LocationType') as GraphQLEnumType;

    render(<WrappedComponent type={type} />);

    expect(screen.getByText('SPACESHIP')).toBeInTheDocument();
    expect(screen.getByText('HOUSE')).toBeInTheDocument();
    expect(screen.getByText('CAMPSITE')).toBeInTheDocument();
    expect(screen.getByText('APARTMENT')).toBeInTheDocument();
  });
});
