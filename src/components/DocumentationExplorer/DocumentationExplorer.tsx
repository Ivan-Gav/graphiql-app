import { useMemo } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { buildClientSchema } from 'graphql';
import { useAppSelector } from 'src/hooks/redux';
import DocBreadCrumbs from './DocBreadCrumbs';
import Docs from './Docs';
import Doc from './Doc';
import { getGraphqlState } from 'src/store/slice/graphql.slice';

export default function DocumentationExplorer() {
  const { isLoading, errorMessage, schemaApi } =
    useAppSelector(getGraphqlState);
  const schema = useMemo(
    () => (schemaApi ? buildClientSchema(schemaApi) : null),
    [schemaApi]
  );

  const { docPath: path } = useAppSelector((state) => state.docReducer);

  const style = {
    pb: 2,
    overflow: 'hidden',
    height: '100%',
    border: 'none',
  };

  if (isLoading) throw Promise.resolve('loading');
  if (errorMessage)
    return (
      <Stack>
        <Typography variant="h2">
          Following error occured: {errorMessage}
        </Typography>
      </Stack>
    );
  if (!schema)
    return (
      <Stack>
        <Typography variant="h2">No schema</Typography>
      </Stack>
    );

  return (
    <Paper sx={style}>
      {path.length <= 1 && <Docs schema={schema} />}
      {path.length > 1 && (
        <Stack height="100%">
          <DocBreadCrumbs />
          <Doc item={path[path.length - 1]} schema={schema} />
        </Stack>
      )}
    </Paper>
  );
}
