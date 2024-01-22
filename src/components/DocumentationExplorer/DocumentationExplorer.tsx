import { useMemo } from 'react';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { buildClientSchema } from 'graphql';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import DocBreadCrumbs from './DocBreadCrumbs';
import Docs from './Docs';
import Doc from './Doc';
import { getGraphqlState } from 'src/store/slice/graphql.slice';
import { closeDocs, getDocState } from 'src/store/slice/DocSlice';
import { useText } from 'src/hooks/useText';

export default function DocumentationExplorer() {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage, schemaApi } =
    useAppSelector(getGraphqlState);
  const schema = useMemo(
    () => (schemaApi ? buildClientSchema(schemaApi) : null),
    [schemaApi]
  );

  const { docPath: path } = useAppSelector(getDocState);

  const T = useText();

  const style = {
    pb: 2,
    overflow: 'hidden',
    height: '100%',
    border: 'none',
    minWidth: '280px',
    maxWidth: '380px',
    position: 'relative',
  };

  function CloseButton() {
    return (
      <IconButton
        disabled={!schemaApi}
        onClick={() => dispatch(closeDocs())}
        title={T.CLOSE_DOCS}
        sx={{ position: 'absolute', top: '8px', right: '8px' }}
      >
        <DisabledByDefaultRoundedIcon />
      </IconButton>
    );
  }

  if (isLoading) throw Promise.resolve('loading');
  if (errorMessage)
    return (
      <Stack>
        <Typography variant="h2">
          {T.FOLLOWING_ERROR}
          {errorMessage}
        </Typography>
      </Stack>
    );
  if (!schema)
    return (
      <Stack>
        <Typography variant="h2">{T.NO_SCHEMA}</Typography>
      </Stack>
    );

  return (
    <Paper sx={style}>
      <CloseButton />
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
