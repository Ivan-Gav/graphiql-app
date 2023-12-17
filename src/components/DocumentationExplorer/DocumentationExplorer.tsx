import { Paper, Stack } from '@mui/material';
import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { getSchema } from 'src/api/apiSchema';

export default function DocumentationExplorer() {
  // temporary section for dev purposes -- start
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    async function fetchSchema() {
      const s = await getSchema();
      console.log(s);
      setSchema(s instanceof GraphQLSchema ? s : null);
    }
    fetchSchema();
  }, []);
  // temporary section for dev purposes -- end

  const queryType = schema?.getQueryType() || null;
  const mutationType = schema?.getMutationType?.() || null;
  const subscriptionType = schema?.getSubscriptionType?.() || null;
  const typeMap = schema?.getTypeMap() || null;
  const ignoreTypesInAllSchema = [
    queryType?.name,
    mutationType?.name,
    subscriptionType?.name,
  ];

  return (
    <>
      <Paper sx={{ p: 2 }}>
        {schema ? 'We have a schema' : 'No schema found'}
        <Stack>
          {schema?.description ||
            'A GraphQL schema provides a root type for each kind of operation.'}
        </Stack>
        <Stack>
          {queryType ? (
            <div>
              <span>query</span>
              {': '}
              <span>{queryType.name}</span>
            </div>
          ) : null}
          {mutationType && (
            <div>
              <span>mutation</span>
              {': '}
              <span>{mutationType.name}</span>
            </div>
          )}
          {subscriptionType && (
            <div>
              <span>subscription</span>
              {': '}
              <span>{subscriptionType.name}</span>
            </div>
          )}
        </Stack>
        <Stack>
          {typeMap && (
            <div>
              {Object.values(typeMap).map((type) => {
                if (
                  ignoreTypesInAllSchema.includes(type.name) ||
                  type.name.startsWith('__')
                ) {
                  return null;
                }

                return (
                  <div key={type.name}>
                    <span>{type.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Stack>
      </Paper>
    </>
  );
}
