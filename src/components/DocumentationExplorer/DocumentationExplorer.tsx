import { Divider, Link, Paper, Stack, Typography } from '@mui/material';
import {
  GraphQLEnumType,
  GraphQLNamedType,
  GraphQLSchema,
  GraphQLType,
  isEnumType,
  isListType,
  isNonNullType,
} from 'graphql';
import React, { useEffect, useState } from 'react';
import { getSchema } from 'src/api/apiSchema';

type CustomGraphQLType = GraphQLNamedType & {
  _fields?: { [key: string]: CustomGraphQLType };
  type?: GraphQLType & { name: string };
};

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

  // current whereabouts in docs
  const [path, setPath] = useState<string[]>(['Docs']);

  const queryType = schema?.getQueryType() || null;
  const mutationType = schema?.getMutationType?.() || null;
  const subscriptionType = schema?.getSubscriptionType?.() || null;
  const typeMap = schema?.getTypeMap() || null;
  const schemaDescription =
    schema?.description ||
    'A GraphQL schema provides a root type for each kind of operation.';
  const ignoreTypesInAllSchema = [
    queryType?.name,
    mutationType?.name,
    subscriptionType?.name,
  ];

  // type check utility - start
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
        console.log(`${bob} in ${p.name}`);
        return p._fields[bob] as CustomGraphQLType;
      } else {
        throw new Error(`Sorry, I can't find the field "${bob}"`);
      }
    }

    return selectedType as unknown as CustomGraphQLType;
  };
  // type check utility - end

  // DocsBreadCrumbs component - start
  function DocsBreadCrumbs() {
    if (path.length <= 1) return null;

    const onBCClick = () => setPath(path.slice(0, -1));

    return (
      <span>
        &lt;&nbsp;<Link onClick={onBCClick}>{path[path.length - 2]}</Link>
      </span>
    );
  }
  // DocsBreadCrumbs component - end

  // TypeLink component - start
  function TypeLink(props: { type: GraphQLNamedType }) {
    const { type } = props;

    const handleClick = (e: React.MouseEvent) => {
      if (e.target instanceof HTMLAnchorElement && e.target.textContent)
        setPath([...path, e.target.textContent]);
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
      <Link sx={{ fontWeight: 'normal' }} onClick={handleClick}>
        {type.name}
      </Link>
    );
  }
  // TypeLink component - end

  // FieldLink component - start
  function FieldLink(props: { type: CustomGraphQLType }) {
    const { type } = props;
    const text = type.name || '';

    const handleClick = (e: React.MouseEvent) => {
      if (e.target instanceof HTMLAnchorElement && e.target.textContent)
        setPath([...path, e.target.textContent]);
    };

    return (
      <>
        <Link sx={{ fontWeight: 'normal' }} onClick={handleClick}>
          {text}
        </Link>
        {': '}
        {!!type.type && <TypeLink type={type.type as GraphQLNamedType} />}
      </>
    );
  }
  // FieldLink component - end

  // Docs main page component - start
  function Docs() {
    return (
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Typography variant="h3">Docs</Typography>
        </Stack>
        <Stack spacing={2}>{schemaDescription}</Stack>
        <Stack>Root types</Stack>
        <Stack spacing={2}>
          {!!queryType && (
            <div>
              <span>query</span>
              {': '}
              <TypeLink type={queryType} />
            </div>
          )}
          {!!mutationType && (
            <div>
              <span>mutation</span>
              {': '}
              <TypeLink type={mutationType} />
            </div>
          )}
          {!!subscriptionType && (
            <div>
              <span>subscription</span>
              {': '}
              <TypeLink type={subscriptionType} />
            </div>
          )}
        </Stack>
        <Stack>All schema types</Stack>
        <Stack spacing={2}>
          {!!typeMap && (
            <div>
              {Object.values(typeMap).map((type) => {
                if (
                  ignoreTypesInAllSchema.includes(type.name) ||
                  type.name.startsWith('__')
                ) {
                  return null;
                }

                return (
                  <div key={type.name}>
                    <TypeLink type={type} />
                  </div>
                );
              })}
            </div>
          )}
        </Stack>
      </Stack>
    );
  }
  // Docs main page component - end

  // Doc page for enum type - start
  function EnumTypePage(props: { type: GraphQLEnumType }) {
    const { type } = props;
    const values = type.getValues();

    return (
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h4">{type.name}</Typography>
        </Stack>
        <Stack>
          {!!type.description && (
            <Typography variant="body1">{type.description}</Typography>
          )}
        </Stack>
        <Stack>
          {!!values.length && (
            <>
              <Stack>
                <Typography variant="h5">Enum Values</Typography>
              </Stack>
              {values.map((val) => {
                return (
                  <>
                    <Divider />
                    <div key={val.value}>
                      <Typography variant="subtitle2">{val.value}</Typography>
                      <br />
                      {!!val.description && (
                        <Typography variant="caption">
                          {val.description}
                        </Typography>
                      )}
                    </div>
                  </>
                );
              })}
            </>
          )}
        </Stack>
      </Stack>
    );
  }

  // Doc page for enum type - end

  // Doc page component - start
  function DocPage(props: { bob: string }) {
    const { bob } = props;

    const selectedType = typeCheck(bob);

    if (isEnumType(selectedType)) return <EnumTypePage type={selectedType} />;

    console.log(`Type of ${selectedType?.name} is ${selectedType?.type?.name}`); // delete it!

    const fields = selectedType?._fields || {};

    return (
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h4">{bob}</Typography>
        </Stack>
        <Stack>
          {!!selectedType?.description && (
            <Typography variant="body1">{selectedType?.description}</Typography>
          )}
        </Stack>
        <Stack>
          {!!Object.keys(fields).length && (
            <>
              <Stack>
                <Typography variant="h5">Fields</Typography>
              </Stack>
              {Object.values(fields).map((field) => {
                return (
                  <>
                    <Divider />
                    <div key={field.name}>
                      <FieldLink type={field} />
                      <br />
                      <Typography variant="caption">
                        {field.description}
                      </Typography>
                    </div>
                  </>
                );
              })}
            </>
          )}
          {!Object.keys(fields).length && !!selectedType?.type?.name && (
            <>
              <Stack>
                <Typography variant="h5">Type</Typography>
              </Stack>
              <TypeLink type={selectedType.type as GraphQLNamedType} />
            </>
          )}
        </Stack>
      </Stack>
    );
  }
  // Doc page component - end

  if (!schema) return <Stack>No schema found</Stack>;

  return (
    <>
      <Paper sx={{ p: 2 }}>
        {path.length <= 1 && <Docs />}
        {path.length > 1 && (
          <>
            <DocsBreadCrumbs />
            <DocPage bob={path[path.length - 1]} />
          </>
        )}
      </Paper>
    </>
  );
}
