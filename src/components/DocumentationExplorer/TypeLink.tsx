import { Link } from '@mui/material';
import { GraphQLNamedType, isListType, isNonNullType } from 'graphql';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { TypeLinkProps } from 'src/models/models';
import { getDocState, setPath } from 'src/store/slice/DocSlice';

export default function TypeLink(props: TypeLinkProps) {
  const { type } = props;

  const dispatch = useAppDispatch();
  const { docPath: path } = useAppSelector(getDocState);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLAnchorElement && e.target.textContent)
      dispatch(setPath([...path, e.target.textContent]));
  };

  function TypeLinkWrapper(props: {
    children: React.ReactNode;
    isList: boolean;
    isNonNull: boolean;
  }) {
    const { children, isList, isNonNull } = props;

    return isList ? (
      <>
        {'['}
        {children}
        {']'}
      </>
    ) : isNonNull ? (
      <>
        {children}
        {'!'}
      </>
    ) : (
      <>{children}</>
    );
  }

  const isList = isListType(type);
  const isNonNull = isNonNullType(type);

  if (isNonNull || isList) {
    return (
      <TypeLinkWrapper isList={isList} isNonNull={isNonNull}>
        <TypeLink type={type.ofType as GraphQLNamedType} />
      </TypeLinkWrapper>
    );
  }

  return (
    <Link
      noWrap
      title={type.name}
      sx={{ fontWeight: 'normal' }}
      onClick={handleClick}
    >
      {type.name}
    </Link>
  );
}
