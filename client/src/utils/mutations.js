import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login({$email: String!, $user: String!}, $password: String!) {
    login({email: $email, user: $user}, password: $password) {
        token
        user {
        _id
        user
        }
    }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($user: String!, $email: String!, $password: String!) {
    createUser(user: $user, email: $email, password: $password) {
        token
        user {
        _id
        user
        }
    }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($User.savedBooks.bookId: String!) {
        addBook(User.savedBooks.bookId: $User.savedBooks.bookId) {
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


export const DELETE_BOOK = gql`
    mutation deleteBook($User.savedBooks.bookId: String!) {
        deleteBook(User.savedBooks.bookId: $User.savedBooks.bookId) {
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
