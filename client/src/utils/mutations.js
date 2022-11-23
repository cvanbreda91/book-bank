import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login({$email: String!, $username: String!}, $password: String!) {
    login({email: $email, username: $username}, password: $password) {
        token
        user {
        _id
        username
        }
    }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        user
        }
    }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($Book: String!) {
        username
        email
        bookCount
        saveBook(savedBooks: $bookSchema) {
            bookId
            authors
            description
            title
            image
            link
            }
        }
    }
`;


export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            username
            email
            bookCount
            savedBooks {
            authors
            description
            bookId
            image
            link
            title
            }
        }
    }
`;
