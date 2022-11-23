const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user: [User]
    user(username: String!): User
    books(username: String): [User.savedBooks.Book]
    book(User.savedBooks.bookId: ID!): book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(User.savedBooks.bookId: String!): Book
    deleteBook(User.savedBooks.bookId: String!): Book
  }
`;

module.exports = typeDefs;