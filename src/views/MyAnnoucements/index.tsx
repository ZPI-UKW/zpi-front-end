import Card from '../../components/ProductCard/card';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@material-ui/core';
import AddAnnoucementButton from '../../components/AddAnnouncementBtn';
import { useQuery } from '@apollo/client';
import { MY_ANNOUCEMENTS } from '../../graphql/annoucements';
import { useAuthContextState } from '../../context/auth/authContext';
import { QueryData, QueryVars } from './types';
import ErrorMessage from '../../components/ErrorMessage';
import { Status } from '../../components/ProductCard/types';

const MyAnnoucements = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { userInfo } = useAuthContextState();
  const { data, error, loading } = useQuery<QueryData, QueryVars>(MY_ANNOUCEMENTS, {
    variables: { addedBy: userInfo._id },
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
      <ViewTitle>Moje ogłoszenia</ViewTitle>
      <CardsContainer>
        {!matches && <AddAnnoucementButton />}
        {data?.getAnnoucements.map((el) => (
          <Card
            variant="your"
            key={el.id}
            title={el.title}
            price={el.costs.day}
            _id={el.id}
            images={el.images}
            location={el.location}
            status={Status[el.status]}
            categoryId={el.categoryId}
          />
        ))}
      </CardsContainer>
    </ViewContainer>
  );
};

export default MyAnnoucements;
