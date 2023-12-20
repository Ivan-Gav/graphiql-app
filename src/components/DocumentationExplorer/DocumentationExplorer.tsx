import { Paper, Stack } from '@mui/material';
import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { getSchema } from 'src/api/apiSchema';
import { useAppSelector } from 'src/hooks/redux';
import DocBreadCrumbs from './DocBreadCrumbs';
import Docs from './Docs';
import Doc from './Doc';

export default function DocumentationExplorer() {
  // temporary section for dev purposes -- start
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  useEffect(() => {
    async function fetchSchema() {
      const s = await getSchema();
      console.log(s);
      setSchema(s instanceof GraphQLSchema ? s : null);
    }
    fetchSchema();
  }, []);
  // temporary section for dev purposes -- end

  const { docPath: path } = useAppSelector((state) => state.docReducer);

  // type check utility - start
  // const typeCheck = (bob: string) => {
  //   const selectedType = schema?.getType(bob); // side effect

  //   if (!selectedType) {
  //     // it is a field, but not a type
  //     const parent = schema?.getType(
  //       path[path.length - 2] // side effect
  //     );
  //     if (!parent) {
  //       throw new Error(`Sorry, I can't find the field "${bob}"`);
  //     }
  //     const p = parent as CustomGraphQLType;
  //     if (p && p._fields && bob in p._fields) {
  //       return p._fields[bob] as CustomGraphQLType;
  //     } else {
  //       throw new Error(`Sorry, I can't find the field "${bob}"`);
  //     }
  //   }

  //   return selectedType as unknown as CustomGraphQLType;
  // };
  // Doc page component - start
  // function Doc(props: { bob: string }) {
  //   const { bob } = props;

  //   const selectedType = typeCheck(bob);

  //   let sectionType = '';
  //   if (isEnumType(selectedType)) sectionType = 'ENUM';
  //   if (isObjectType(selectedType) || isInputObjectType(selectedType))
  //     sectionType = 'FIELDS';
  //   if (
  //     selectedType?.type &&
  //     (selectedType.type.name || 'ofType' in selectedType.type)
  //   )
  //     sectionType = 'TYPE';

  //   return (
  //     <Stack spacing={2}>
  //       <Stack>
  //         <Typography noWrap title={bob} variant="h3">
  //           {bob}
  //         </Typography>
  //       </Stack>
  //       <Stack>
  //         {!!selectedType?.description && (
  //           <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
  //             {selectedType?.description}
  //           </Typography>
  //         )}
  //       </Stack>

  //       <Stack>
  //         {sectionType === 'ENUM' && (
  //           <EnumTypeSection type={selectedType as GraphQLEnumType} />
  //         )}
  //         {sectionType === 'FIELDS' && <FieldsSection type={selectedType} />}
  //         {sectionType === 'TYPE' && selectedType?.type && (
  //           <TypeSection type={selectedType.type as GraphQLNamedType} />
  //         )}
  //       </Stack>
  //     </Stack>
  //   );
  // }
  // Doc page component - end

  if (!schema) return <Stack>No schema found</Stack>;

  return (
    <>
      <Paper sx={{ p: 2 }}>
        {path.length <= 1 && <Docs schema={schema} />}
        {path.length > 1 && (
          <>
            <DocBreadCrumbs />
            <Doc bob={path[path.length - 1]} schema={schema} />
          </>
        )}
      </Paper>
    </>
  );
}
