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

type DocProps = {
  bob: string;
  schema: GraphQLSchema;
};

export default function Doc(props: DocProps) {
  const { bob, schema } = props;
  const { docPath: path } = useAppSelector((state) => state.docReducer);

  const typeCheck = (bob: string) => {
    const selectedType = schema?.getType(bob); // side effect

    if (!selectedType) {
      // it is a field, but not a type
      const parent = schema?.getType(
        path[path.length - 2] // side effect
      );
      if (!parent) {
        throw new Error(`Sorry, I can't find the field "${bob}"`);
      }
      const p = parent as CustomGraphQLType;
      if (p && p._fields && bob in p._fields) {
        return p._fields[bob] as CustomGraphQLType;
      } else {
        throw new Error(`Sorry, I can't find the field "${bob}"`);
      }
    }

    return selectedType as unknown as CustomGraphQLType;
  };

  const selectedType = typeCheck(bob);

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
    <Stack spacing={2}>
      <Stack>
        <Typography noWrap title={bob} variant="h3">
          {bob}
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
