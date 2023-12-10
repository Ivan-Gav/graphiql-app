const endPointApi = 'https://rickandmortyapi.com/graphql';

export const getData = (query: string): Promise<Response> => {
  return fetch(endPointApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });
};
