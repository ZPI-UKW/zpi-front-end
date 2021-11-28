import { gql } from '@apollo/client';

export const CREATE_ANNOUCEMENT = gql`
  mutation CreateAnnoucement(
    $title: String!
    $description: String!
    $location: String!
    $phone: String!
    $email: String!
    $images: [String]
    $day: Float!
    $week: Float!
    $month: Float!
    $category: ID!
    $condition: String!
  ) {
    createAnnoucement(
      annoucementInput: {
        title: $title
        description: $description
        location: $location
        phone: $phone
        email: $email
        images: $images
        costs: { day: $day, week: $week, month: $month }
        category: $category
        condition: $condition
      }
    ) {
      id
    }
  }
`;

export const EDIT_ANNOUCEMENT = gql`
  mutation EditAnnoucement(
    $id: ID!
    $title: String!
    $description: String!
    $location: String!
    $phone: String!
    $email: String!
    $images: [String]
    $day: Float!
    $week: Float!
    $month: Float!
    $condition: String!
  ) {
    editAnnoucement(
      annoucementInput: {
        id: $id
        title: $title
        description: $description
        location: $location
        phone: $phone
        email: $email
        images: $images
        costs: { day: $day, week: $week, month: $month }
        condition: $condition
      }
    ) {
      id
    }
  }
`;

export const GET_ANNOUCEMENT_BY_ID = gql`
  query MyAnnoucement($id: String!) {
    getAnnoucement(id: $id) {
      id
      title
      description
      location
      categoryId {
        id
        name
      }
      phone
      email
      costs {
        day
        week
        month
      }
      images
      condition
    }
  }
`;

export const DELETE_ANNOUCEMENT = gql`
  mutation DeleteAnnoucement($annoucementId: ID!) {
    deleteAnnoucement(annoucementId: $annoucementId)
  }
`;
