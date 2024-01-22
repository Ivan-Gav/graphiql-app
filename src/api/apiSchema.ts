// This is a tentative file for development purposes, DELETE IT when proper api client is ready!

import { buildClientSchema, getIntrospectionQuery } from 'graphql';

const endPointApi = 'https://rickandmortyapi.com/graphql';

export const getSchema = async () => {
  const res = await fetch(endPointApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });
  const data = await res.json();
  return buildClientSchema(data.data);
};
