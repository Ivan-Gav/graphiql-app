// Initial screen of Documentation section with root types and all schema types

import { useMemo } from 'react';
import { Stack, Typography, Grid, Box } from '@mui/material';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import AdjustIcon from '@mui/icons-material/Adjust';
import TypeLink from './TypeLink';
import { GraphQLSchema } from 'graphql';
import LazyList from './LazyList';
import { useText } from 'src/hooks/useText';

export default function Docs(props: { schema: GraphQLSchema | null }) {
  const { schema } = props;
  const T = useText();

  const queryType = schema?.getQueryType() || null;
  const mutationType = schema?.getMutationType?.() || null;
  const subscriptionType = schema?.getSubscriptionType?.() || null;
  const typeMap = useMemo(() => schema?.getTypeMap() || null, [schema]);

  const schemaDescription =
    schema?.description ||
    'A GraphQL schema provides a root type for each kind of operation.';
  const ignoreTypes = useMemo(
    () => [queryType?.name, mutationType?.name, subscriptionType?.name],
    [queryType, mutationType, subscriptionType]
  );

  const filteredTypeMapArr = useMemo(
    () =>
      typeMap
        ? Object.values(typeMap).filter(
            (type) =>
              !(ignoreTypes.includes(type.name) || type.name.startsWith('__'))
          )
        : null,
    [typeMap, ignoreTypes]
  );

  return (
    <Stack spacing={2} flexGrow={1} height="100%">
      <Stack spacing={2} p={2} pb={0}>
        <Stack spacing={2}>
          <Typography variant="h3">Docs</Typography>
        </Stack>
        <Stack spacing={2}>{schemaDescription}</Stack>
        <Grid container alignItems="center" gap={1}>
          <DeviceHubRoundedIcon fontSize="small" />
          <Typography variant="subtitle1">{T.ROOT_TYPES}</Typography>
        </Grid>
        <Stack spacing={2}>
          {!!queryType && (
            <Grid container px={2} textOverflow="ellipsis" overflow="hidden">
              <Typography
                variant="body1"
                noWrap
                sx={{ color: 'secondary.main' }}
              >
                query
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={queryType} />
            </Grid>
          )}
          {!!mutationType && (
            <Grid container px={2} textOverflow="ellipsis" overflow="hidden">
              <Typography
                variant="body1"
                noWrap
                sx={{ color: 'secondary.main' }}
              >
                mutation
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={mutationType} />
            </Grid>
          )}
          {!!subscriptionType && (
            <Grid container px={2} textOverflow="ellipsis" overflow="hidden">
              <Typography
                variant="body1"
                noWrap
                sx={{ color: 'secondary.main' }}
              >
                subscription
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={subscriptionType} />
            </Grid>
          )}
        </Stack>
        <Grid container alignItems="center" gap={1}>
          <AdjustIcon fontSize="small" />
          <Typography variant="subtitle1">{T.SCHEMA_TYPES}</Typography>
        </Grid>
      </Stack>
      <Box flexGrow={1}>
        {!!filteredTypeMapArr && (
          <LazyList
            listLength={filteredTypeMapArr.length}
            typeArr={filteredTypeMapArr}
          />
        )}
      </Box>
    </Stack>
  );
}
