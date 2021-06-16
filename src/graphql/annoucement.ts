import { gql } from '@apollo/client';

export const CREATE_ANNOUCEMENT = gql`
  mutation CreatePassword(
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
      }
    ) {
      id
    }
  }
`;
