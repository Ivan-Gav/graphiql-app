import { Divider, Grid, Stack, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { GraphQLEnumType } from 'graphql';
import { useText } from 'src/hooks/useText';

export default function EnumTypeSection(props: { type: GraphQLEnumType }) {
  const { type } = props;
  const values = type.getValues();
  const T = useText();

  return (
    <Stack>
      {!!values.length && (
        <>
          <Grid container alignItems="center" gap={1} mb={1}>
            <ListAltIcon fontSize="small" />
            <Typography variant="h4">{T.ENUM_VALUES}</Typography>
          </Grid>
          {values.map((val) => {
            return (
              <Stack key={val.value} mb={1} px={2}>
                <Divider />
                <Grid textOverflow="ellipsis" overflow="hidden">
                  <Typography
                    title={val.value}
                    variant="subtitle2"
                    sx={{ color: 'secondary.main' }}
                  >
                    {val.value}
                  </Typography>
                </Grid>
                {!!val.description && (
                  <Typography variant="caption">{val.description}</Typography>
                )}
              </Stack>
            );
          })}
        </>
      )}
    </Stack>
  );
}
