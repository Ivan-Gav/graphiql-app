import { Paper } from '@mui/material';
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

  return (
    <>
      <Paper sx={{ p: 2 }}>
        {schema ? 'We have a schema' : 'No schema found'}
      </Paper>
    </>
  );
}
