import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!): User
  }
`;

export default typeDefs;
