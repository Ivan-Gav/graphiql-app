import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
  }
 
  type Query {
    user(id: ID!): User
  }
`);
