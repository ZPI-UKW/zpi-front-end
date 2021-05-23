import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      email
      lastname
      name
      phonenumber
    }
  }
`;

export const REGISTER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $name: String!
    $lastname: String!
    $phonenumber: String!
  ) {
    createUser(
      userInput: {
        email: $email
        password: $password
        name: $name
        lastname: $lastname
        phonenumber: $phonenumber
      }
    ) {
      _id
    }
  }
`;
