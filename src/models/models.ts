import { GraphQLNamedType, GraphQLType } from 'graphql';
import TEXT from 'src/constants/text';

type KeysOfText = keyof typeof TEXT.EN;

export type LangContextProviderProps = {
  children: React.ReactNode;
};

export type Lang = 'EN' | 'RU';

export type LangContextType = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

export type T = { [Key in KeysOfText]: string };

export type CustomGraphQLType = GraphQLNamedType & {
  _fields?: { [key: string]: CustomGraphQLType };
  type?: GraphQLType & { name: string };
};

export type TypeLinkProps = {
  type: GraphQLNamedType;
};

export type FieldLinkProps = {
  type: CustomGraphQLType;
};
