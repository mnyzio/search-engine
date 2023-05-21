const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    saveBooks: [bookSchema]
  }

  type bookSchema {
    authors: [String!]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;

// ```
//todo Mutations
//todo change addUser to return Auth
// addUser(username: String!, email: String!, password: String!): Auth
//todo change login to return Auth
// login(email: String!, password: String!): Auth
// ```;
