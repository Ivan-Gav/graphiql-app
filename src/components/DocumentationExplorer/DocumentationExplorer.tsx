import { Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import AdjustIcon from '@mui/icons-material/Adjust';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
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
      <Grid>
        <Link
          sx={{ fontWeight: 'normal', color: 'secondary.main' }}
          onClick={handleClick}
        >
          {text}
        </Link>
        <span>:&nbsp;</span>
        {!!type.type && <TypeLink type={type.type as GraphQLNamedType} />}
      </Grid>
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
        <Grid container alignItems="center" gap={1}>
          <DeviceHubRoundedIcon fontSize="small" />
          <Typography variant="subtitle1">Root types</Typography>
        </Grid>
        <Stack spacing={2}>
          {!!queryType && (
            <Grid container px={2}>
              <Typography variant="body1" sx={{ color: 'secondary.main' }}>
                query
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={queryType} />
            </Grid>
          )}
          {!!mutationType && (
            <Grid container px={2}>
              <Typography variant="body1" sx={{ color: 'secondary.main' }}>
                mutation
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={mutationType} />
            </Grid>
          )}
          {!!subscriptionType && (
            <Grid container px={2}>
              <Typography variant="body1" sx={{ color: 'secondary.main' }}>
                subscription
              </Typography>
              <span>:&nbsp;</span>
              <TypeLink type={subscriptionType} />
            </Grid>
          )}
        </Stack>
        <Grid container alignItems="center" gap={1}>
          <AdjustIcon fontSize="small" />
          <Typography variant="subtitle1">All schema types</Typography>
        </Grid>
        <Stack spacing={0.5}>
          {!!typeMap && (
            <>
              {Object.values(typeMap).map((type) => {
                if (
                  ignoreTypesInAllSchema.includes(type.name) ||
                  type.name.startsWith('__')
                ) {
                  return null;
                }

                return (
                  <Stack key={type.name} px={2}>
                    <TypeLink type={type} />
                  </Stack>
                );
              })}
            </>
          )}
        </Stack>
      </Stack>
    );
  }
  // Docs main page component - end

  // Section for enum type - start
  function EnumTypeSection(props: { type: GraphQLEnumType }) {
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
  // Section for enum type - end

  // Section with fields - start

  // Section with fields - end

  // Doc page component - start
  function Doc(props: { bob: string }) {
    const { bob } = props;

    const selectedType = typeCheck(bob);

    if (isEnumType(selectedType))
      return <EnumTypeSection type={selectedType} />;
    // let section: React.ReactNode = <></>;
    // if (isEnumType(selectedType))
    //   section = <EnumTypeSection type={selectedType} />;

    // if (isObjectType(selectedType)) section = <></>;

    const fields = selectedType?._fields || {};

    return (
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h3">{bob}</Typography>
        </Stack>
        <Stack>
          {!!selectedType?.description && (
            <Typography variant="body1">{selectedType?.description}</Typography>
          )}
        </Stack>
        <Stack>
          {!!Object.keys(fields).length && (
            <>
              <Grid container alignItems="center" gap={1} mb={1}>
                <AccountTreeRoundedIcon fontSize="small" />
                <Typography variant="h4">Fields</Typography>
              </Grid>
              {Object.values(fields).map((field) => {
                return (
                  <Stack key={field.name} mb={1} px={2}>
                    <Divider />
                    <FieldLink type={field} />
                    <Typography variant="caption">
                      {field.description}
                    </Typography>
                  </Stack>
                );
              })}
            </>
          )}
          {!Object.keys(fields).length && !!selectedType?.type?.name && (
            <>
              <Grid container alignItems="center" gap={1} mb={1}>
                <AdjustIcon fontSize="small" />
                <Typography variant="h4">Type</Typography>
              </Grid>
              <Stack px={2}>
                <TypeLink type={selectedType.type as GraphQLNamedType} />
              </Stack>
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
            <Doc bob={path[path.length - 1]} />
          </>
        )}
      </Paper>
    </>
  );
}
