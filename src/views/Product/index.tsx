import { useParams } from 'react-router';
import { RouteParams, QueryData, QueryVars } from './types';
import { Box, CircularProgress, Container } from '@material-ui/core';
import Annoucement from '../../components/Annoucement';
import useStyles from './styles';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { GET_ANNOUCEMENT_BY_ID } from '../../graphql/annoucements';
import ErrorMessage from '../../components/ErrorMessage';

const Product = () => {
  const classes = useStyles();
  const { adId } = useParams<RouteParams>();
  const { data, error, loading } = useQuery<QueryData, QueryVars>(GET_ANNOUCEMENT_BY_ID, {
    variables: { id: adId },
  });

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <ErrorMessage>Nie znaleziono ogłoszenia.</ErrorMessage>;

  return (
    <Container className={clsx(classes.root, !data?.getAnnoucement && classes.centered)}>
      {data?.getAnnoucement ? (
        <Annoucement annoucement={data.getAnnoucement} />
      ) : (
        <ErrorMessage>Wystąpił nieznany błąd.</ErrorMessage>
      )}
    </Container>
  );
};

export default Product;
