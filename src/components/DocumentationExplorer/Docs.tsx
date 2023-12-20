// Initial screen of Documentation section with root types and all schema types

import { Stack, Typography, Grid } from '@mui/material';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import AdjustIcon from '@mui/icons-material/Adjust';
import TypeLink from './TypeLink';
import { GraphQLSchema } from 'graphql';

export default function Docs(props: { schema: GraphQLSchema | null }) {
  const { schema } = props;

  const queryType = schema?.getQueryType() || null;
  const mutationType = schema?.getMutationType?.() || null;
  const subscriptionType = schema?.getSubscriptionType?.() || null;
  const typeMap = schema?.getTypeMap() || null;
  const schemaDescription =
    schema?.description ||
    'A GraphQL schema provides a root type for each kind of operation.';
  const ignoreTypes = [
    queryType?.name,
    mutationType?.name,
    subscriptionType?.name,
  ];

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography variant="h3">Docs</Typography>
      </Stack>
      <Stack spacing={2}>{schemaDescription}</Stack>
      <Grid container alignItems="center" gap={1}>
        <DeviceHubRoundedIcon fontSize="small" />
        <Typography variant="subtitle1">Root types</Typography>
      </Grid>
      <Stack spacing={2}>
        {!!queryType && (
          <Grid container px={2}>
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              query
            </Typography>
            <span>:&nbsp;</span>
            <TypeLink type={queryType} />
          </Grid>
        )}
        {!!mutationType && (
          <Grid container px={2}>
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              mutation
            </Typography>
            <span>:&nbsp;</span>
            <TypeLink type={mutationType} />
          </Grid>
        )}
        {!!subscriptionType && (
          <Grid container px={2}>
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              subscription
            </Typography>
            <span>:&nbsp;</span>
            <TypeLink type={subscriptionType} />
          </Grid>
        )}
      </Stack>
      <Grid container alignItems="center" gap={1}>
        <AdjustIcon fontSize="small" />
        <Typography variant="subtitle1">All schema types</Typography>
      </Grid>
      <Stack spacing={0.5}>
        {!!typeMap && (
          <>
            {Object.values(typeMap).map((type) => {
              if (
                ignoreTypes.includes(type.name) ||
                type.name.startsWith('__')
              ) {
                return null;
              }

              return (
                <Stack key={type.name} px={2}>
                  <TypeLink type={type} />
                </Stack>
              );
            })}
          </>
        )}
      </Stack>
    </Stack>
  );
}
