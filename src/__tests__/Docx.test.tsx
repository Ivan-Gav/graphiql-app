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
  it('renders heading', () => {
    render(<WrappedDocsComponent schema={schema} />);

    expect(
      screen.getByRole('heading', { name: 'Docs', level: 3 })
    ).toBeVisible();
  });
});
