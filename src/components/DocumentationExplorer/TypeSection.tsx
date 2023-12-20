import { Grid, Typography } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import TypeLink from './TypeLink';
import { TypeLinkProps } from 'src/models/models';

export default function TypeSection(props: TypeLinkProps) {
  const { type } = props;

  return (
    <>
      <Grid container alignItems="center" gap={1} mb={1}>
        <AdjustIcon fontSize="small" />
        <Typography variant="h4">Type</Typography>
      </Grid>
      <Grid px={2} textOverflow="ellipsis" overflow="hidden">
        <TypeLink type={type} />
      </Grid>
    </>
  );
}
