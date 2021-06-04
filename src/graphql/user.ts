import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      _id
    }
  }
`;

export const CHANGE_USER_DATA = gql`
  mutation ChangeUserData(
    $email: String!
    $name: String!
    $lastname: String!
    $phonenumber: String!
  ) {
    changeUserData(
      userInput: { email: $email, name: $name, lastname: $lastname, phonenumber: $phonenumber }
    ) {
      _id
      email
      name
      lastname
      phonenumber
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetUserData {
    getUserData {
      _id
      email
      lastname
      name
      phonenumber
    }
  }
`;
