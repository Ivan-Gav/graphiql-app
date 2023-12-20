import { Grid, Link } from '@mui/material';
import { GraphQLNamedType } from 'graphql';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { setPath } from 'src/store/slice/DocSlice';
import TypeLink from './TypeLink';
import { FieldLinkProps } from 'src/models/models';

export default function FieldLink(props: FieldLinkProps) {
  const { type } = props;
  const text = type.name;

  const dispatch = useAppDispatch();
  const { docPath: path } = useAppSelector((state) => state.docReducer);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLAnchorElement && e.target.textContent)
      dispatch(setPath([...path, e.target.textContent]));
  };

  return (
    <Grid textOverflow="ellipsis" overflow="hidden">
      <Link
        sx={[
          { fontWeight: 'normal', color: 'secondary.main' },
          { '&:hover': { color: 'secondary.main' } },
        ]}
        noWrap
        title={text}
        onClick={handleClick}
      >
        {text}
      </Link>
      <span>:&nbsp;</span>
      {!!type.type && <TypeLink type={type.type as GraphQLNamedType} />}
    </Grid>
  );
}
