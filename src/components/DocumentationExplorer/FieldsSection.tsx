import { Divider, Grid, Stack, Typography } from '@mui/material';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import { FieldLinkProps } from 'src/models/models';
import FieldLink from './FieldLink';
import { useText } from 'src/hooks/useText';

export default function FieldsSection(props: FieldLinkProps) {
  const { type } = props;
  const fields = type?._fields;

  const T = useText();

  if (!fields) return null;

  return (
    <>
      <Grid container alignItems="center" gap={1} mb={1}>
        <AccountTreeRoundedIcon fontSize="small" />
        <Typography variant="h4">{T.FIELDS}</Typography>
      </Grid>
      {Object.values(fields).map((field) => {
        return (
          <Stack key={field.name} mb={1} px={2}>
            <Divider />
            <FieldLink type={field} />
            <Typography variant="caption">{field.description}</Typography>
          </Stack>
        );
      })}
    </>
  );
}
