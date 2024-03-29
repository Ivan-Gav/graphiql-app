// Detailed documentation page for a type or field

import { Stack, Typography } from '@mui/material';
import {
  isEnumType,
  isObjectType,
  isInputObjectType,
  GraphQLEnumType,
  GraphQLNamedType,
  GraphQLSchema,
} from 'graphql';
import EnumTypeSection from './EnumTypeSection';
import FieldsSection from './FieldsSection';
import TypeSection from './TypeSection';
import { useAppSelector } from 'src/hooks/redux';
import { CustomGraphQLType } from 'src/models/models';
import { getDocState } from 'src/store/slice/DocSlice';
import { useText } from 'src/hooks/useText';

type DocProps = {
  item: string;
  schema: GraphQLSchema;
};

const style = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    bgcolor: 'background.paper',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: 'primary.dark',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'background.paper',
  },
  p: 2,
  overflowY: 'auto',
  flexFrow: 1,
  border: 'none',
};

export default function Doc(props: DocProps) {
  const { item, schema } = props;
  const { docPath: path } = useAppSelector(getDocState);

  const T = useText();

  const typeCheck = (item: string) => {
    const selectedType = schema?.getType(item);

    if (!selectedType) {
      // it is a field, not a type
      const parent = schema?.getType(path[path.length - 2]);
      if (!parent) {
        throw new Error(`${T.CANT_FIND_FIELD}"${item}"`);
      }
      const p = parent as CustomGraphQLType;
      if (p && p._fields && item in p._fields) {
        return p._fields[item] as CustomGraphQLType;
      } else {
        throw new Error(`${T.CANT_FIND_FIELD}"${item}"`);
      }
    }

    return selectedType as unknown as CustomGraphQLType;
  };

  const selectedType = typeCheck(item);

  let sectionType = '';
  if (isEnumType(selectedType)) sectionType = 'ENUM';
  if (isObjectType(selectedType) || isInputObjectType(selectedType))
    sectionType = 'FIELDS';
  if (
    selectedType?.type &&
    (selectedType.type.name || 'ofType' in selectedType.type)
  )
    sectionType = 'TYPE';

  return (
    <Stack spacing={2} sx={style}>
      <Stack>
        <Typography noWrap title={item} variant="h3">
          {item}
        </Typography>
      </Stack>
      <Stack>
        {!!selectedType?.description && (
          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
            {selectedType?.description}
          </Typography>
        )}
      </Stack>

      <Stack>
        {sectionType === 'ENUM' && (
          <EnumTypeSection type={selectedType as GraphQLEnumType} />
        )}
        {sectionType === 'FIELDS' && <FieldsSection type={selectedType} />}
        {sectionType === 'TYPE' && selectedType?.type && (
          <TypeSection type={selectedType.type as GraphQLNamedType} />
        )}
      </Stack>
    </Stack>
  );
}
