import ViewContainer from '../../components/ViewContainer';
import ViewTitle from '../../components/ViewTitle';
import CardsContainer from '../../components/CardsContainer';
import Card from '../../components/ProductCard/card';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { QueryData } from './types';
import { USER_RESERVED_ANNOUCEMENTS } from '../../graphql/annoucements';
import { useEffect } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

const UserReservations = () => {
  const [loadRentals, { data, error, loading }] = useLazyQuery<QueryData, null>(
    USER_RESERVED_ANNOUCEMENTS,
    { fetchPolicy: 'no-cache' }
  );

  const handleLoad = () => loadRentals();

  useEffect(() => {
    handleLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <ErrorMessage>Wystąpił nieznany błąd.</ErrorMessage>;

  return (
    <ViewContainer>
      <ViewTitle>Rezerwacje użytkowników</ViewTitle>
      <CardsContainer>
        {data?.getUserReservedAnnoucements && data?.getUserReservedAnnoucements.length > 0 ? (
          data?.getUserReservedAnnoucements.map((el) => (
            <Card
              variant="myReservedByUsers"
              key={el.id}
              title={el.annoucementId.title}
              price={el.annoucementId.costs.day}
              _id={el.annoucementId.id}
              images={el.annoucementId.images}
              location={el.annoucementId.location}
              categoryId={el.annoucementId.categoryId}
              reservationId={el.id}
              startAt={el.annoucementId.startAt}
              agreement={el.agreement || undefined}
              handleLoad={handleLoad}
            />
          ))
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h3">Brak rezerwacji.</Typography>
          </Box>
        )}
      </CardsContainer>
    </ViewContainer>
  );
}

export default UserReservations;