import { gql } from "apollo-server"


const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
    password: String!
  }
  type Query {
    getUser(id: ID!): User
  }
  type Token {
    token: String
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String): Token
  }
`;

export default typeDefs