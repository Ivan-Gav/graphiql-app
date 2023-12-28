import { Grid, Link, Stack, Typography } from '@mui/material';
import { GraphQLNamedType } from 'graphql';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getDocState, setPath } from 'src/store/slice/DocSlice';
import TypeLink from './TypeLink';
import { CustomGraphQLType, FieldLinkProps } from 'src/models/models';

export default function FieldLink(props: FieldLinkProps) {
  const { type } = props;
  const text = type.name;

  const dispatch = useAppDispatch();
  const { docPath: path } = useAppSelector(getDocState);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLAnchorElement && e.target.textContent)
      dispatch(setPath([...path, e.target.textContent]));
  };

  const ArgList = (props: { type: CustomGraphQLType }) => {
    const { type } = props;
    const args: GraphQLNamedType[] | null =
      'args' in type ? (type.args as GraphQLNamedType[]) : null;

    if (!args || !args.length) return null;

    return (
      <>
        <span>{' ('}</span>
        {Object.values(args).map((arg) => {
          return (
            <Stack key={arg.name} pl={2}>
              <Grid textOverflow="ellipsis" overflow="hidden">
                <Typography
                  component="span"
                  variant="body1"
                  color="info.main"
                  noWrap
                  title={arg.name}
                >
                  {arg.name}
                </Typography>
                <span>:&nbsp;</span>
                {'type' in arg && !!arg.type && (
                  <TypeLink type={arg.type as GraphQLNamedType} />
                )}
              </Grid>
            </Stack>
          );
        })}
        <span>{') '}</span>
      </>
    );
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
      <ArgList type={type} />
      <span>:&nbsp;</span>
      {!!type.type && <TypeLink type={type.type as GraphQLNamedType} />}
    </Grid>
  );
}
