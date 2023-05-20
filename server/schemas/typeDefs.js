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
  }
`;

module.exports = typeDefs;
//        saveBook
// addUser(username: String!, email: String!, password: String!): Auth

// login(email: String!, password: String!): Auth
