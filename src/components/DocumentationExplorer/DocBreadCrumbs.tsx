import { Grid, Link } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getDocState, setPath } from 'src/store/slice/DocSlice';

export default function DocBreadCrumbs() {
  const dispatch = useAppDispatch();
  const { docPath: path } = useAppSelector(getDocState);

  if (path.length <= 1) return null;

  const onBCClick = () => dispatch(setPath(path.slice(0, -1)));

  return (
    <Grid container alignItems="center" gap={1} p={2} flexWrap="nowrap">
      <NavigateBeforeRoundedIcon fontSize="small" />
      <Link
        href="#"
        variant="body1"
        pr={4}
        sx={[{ color: 'inherit' }, { '&:hover': { color: 'inherit' } }]}
        noWrap
        title={path[path.length - 2]}
        onClick={onBCClick}
      >
        {path[path.length - 2]}
      </Link>
    </Grid>
  );
}
