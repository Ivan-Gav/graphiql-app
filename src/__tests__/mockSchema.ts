import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    description: String
    locationType: LocationType!
    posts: [Post]
  }

  type Post {
    id: Int
    user: User
    body: String
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
    posts(id: Int!): Post!
  }

  type Mutation {
    setMessage(message: String): String
  }

  type Subscription {
    getUser: User
  }
`);
