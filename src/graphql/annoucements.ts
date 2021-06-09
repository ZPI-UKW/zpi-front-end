import { gql } from '@apollo/client';

export const MY_ANNOUCEMENTS = gql`
  query MyAnnoucements($addedBy: String!) {
    getAnnoucements(addedBy: $addedBy) {
      id
      title
      images
      costs {
        day
      }
      categoryId
      location
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
    }
  }
`;
