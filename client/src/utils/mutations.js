import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook(
    $authors: [String]
    $description: String
    $title: String
    $bookId: String!
    $image: String
    $link: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      username
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      _id
      email
      bookCount
      savedBooks {
        bookId
        description
        title
        image
        link
        authors
      }
    }
  }
`;
