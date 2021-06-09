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
