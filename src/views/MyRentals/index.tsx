import Card from '../../components/ProductCard/card';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from '@apollo/client';
import { useAuthContextState } from '../../context/authContext';
import { QueryData, QueryVars } from './types';
import { MY_RESERVETIONS } from '../../graphql/annoucements';

const MyRentals = () => {
  const { userInfo } = useAuthContextState();
  const { data, error, loading } = useQuery<QueryData, QueryVars>(MY_RESERVETIONS, {
    variables: { reservedBy: userInfo._id },
  });

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <ErrorMessage>Wystąpił nieznany błąd.</ErrorMessage>;

  return (
    <ViewContainer>
      <ViewTitle>Moje wypozyczenia</ViewTitle>
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
              categoryId={el.categoryId}
              location={el.location}
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
