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

export const MY_RESERVETIONS = gql`
  query MyAnnoucements($reservedBy: String!) {
    getAnnoucements(reservedBy: $reservedBy) {
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
      addedBy {
        _id
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

export const RESERVATION = gql`
  mutation CreateReservation($startAt: String!, $endAt: String!, $annoucementId: ID!) {
    createReservation(
      reservationInput: { startAt: $startAt, endAt: $endAt, annoucementId: $annoucementId }
    ) {
      id
    }
  }
`;