import Card from '../../components/ProductCard/card';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import ErrorMessage from '../../components/ErrorMessage';
import { useLazyQuery } from '@apollo/client';
import { useAuthContextState } from '../../context/auth/authContext';
import { QueryData, QueryVars } from './types';
import { MY_RESERVETIONS } from '../../graphql/annoucements';
import { useEffect } from 'react';

const MyRentals = () => {
  const { userInfo } = useAuthContextState();
  const [loadRentals, { data, error, loading }] = useLazyQuery<QueryData, QueryVars>(
    MY_RESERVETIONS,
    { fetchPolicy: 'no-cache' }
  );

  const handleLoad = () => loadRentals({ variables: { reservedBy: userInfo._id } });

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
      <ViewTitle>Moje wypożyczenia</ViewTitle>
      <CardsContainer>
        {data?.getAnnoucements && data?.getAnnoucements.length > 0 ? (
          data?.getAnnoucements.map((el) => (
            <Card
              variant="rentals"
              key={el.id}
              title={el.title}
              price={el.costs.day}
              _id={el.id}
              images={el.images}
              location={el.location}
              categoryId={el.categoryId}
              reservationId={el.reservationId}
              startAt={el.startAt}
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
};

export default MyRentals;
