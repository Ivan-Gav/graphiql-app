import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { GraphQLNamedType } from 'graphql';
import { Stack } from '@mui/material';
import TypeLink from './TypeLink';
import s from './LazyList.module.css';

type LazyListProps = {
  listLength: number;
  typeArr: GraphQLNamedType[];
};

// const addStyle = {
//   ':-webkit-scrollbar': {
//     width: '8px',
//   },
//   '&::-webkit-scrollbar-track': {
//     backgroundColor: 'background.paper',
//   },
//   '&::-webkit-scrollbar-thumb': {
//     backgroundColor: 'primary.dark',
//     borderRadius: '16px',
//     border: '1px solid',
//     borderColor: 'background.paper',
//   },
//   padding: '1px',
//   overflowY: 'auto',
//   height: '100%',
//   border: 'none',
// };

export default function LazyList(props: LazyListProps) {
  const { listLength, typeArr } = props;

  function Row(props: ListChildComponentProps) {
    const { index, style } = props;
    const type = typeArr[index];

    if (index + 1 >= listLength) return null;

    return (
      <Stack key={type.name} px={2} style={style}>
        <TypeLink type={type} />
      </Stack>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemSize={22.5}
          itemCount={listLength}
          className={s.scroll}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
}
