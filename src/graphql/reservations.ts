import { gql } from '@apollo/client';

export const CANCEL_RESERVATION = gql`
  mutation CancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId)
  }
`;
