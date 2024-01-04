import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GraphQLSchema } from 'graphql';
import { Provider } from 'react-redux';
import { schema } from './mockSchema';
import LangContextProvider from 'src/context/LangContext';
import Docs from 'src/components/DocumentationExplorer/Docs';
import { store } from 'src/store/store';

const WrappedDocsComponent = (props: { schema: GraphQLSchema | null }) => {
  return (
    <LangContextProvider>
      <Provider store={store}>
        <Docs schema={props.schema} />
      </Provider>
    </LangContextProvider>
  );
};

describe('Docs', () => {
  it('should displays schema', () => {
    render(<WrappedDocsComponent schema={schema} />);

    expect(screen.getByText('query')).toBeInTheDocument();
    expect(screen.getByText('mutation')).toBeInTheDocument();
    expect(screen.getByText('subscription')).toBeInTheDocument();
  });

  it('should displays the header without a schema', () => {
    render(<WrappedDocsComponent schema={null} />);

    expect(screen.queryByText('query')).not.toBeInTheDocument();
    expect(screen.queryByText('mutation')).not.toBeInTheDocument();
    expect(screen.queryByText('subscription')).not.toBeInTheDocument();
  });
});
