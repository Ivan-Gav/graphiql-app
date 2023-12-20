import { Grid, Link } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { setPath } from 'src/store/slice/DocSlice';

export default function DocBreadCrumbs() {
  const dispatch = useAppDispatch();
  const { docPath: path } = useAppSelector((state) => state.docReducer);

  if (path.length <= 1) return null;

  const onBCClick = () => dispatch(setPath(path.slice(0, -1)));

  return (
    <Grid container alignItems="center" gap={1} mb={2} flexWrap="nowrap">
      <NavigateBeforeRoundedIcon fontSize="small" />
      <Link
        href="#"
        variant="body1"
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
