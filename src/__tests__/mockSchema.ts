import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    description: String
    locationType: LocationType!
  }

  enum LocationType {
    SPACESHIP
    HOUSE
    CAMPSITE
    APARTMENT
    ROOM
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    setMessage(message: String): String
  }

  type Subscription {
    getUser: User
  }
`);
