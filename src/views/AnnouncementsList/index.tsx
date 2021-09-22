import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { useLocation, useParams } from 'react-router';
import {
  AppBar,
  Breadcrumbs,
  CircularProgress,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';
import useStyles from './styles';
import queryString from 'query-string';
import Search from '../../components/Search';
import { ReactComponent as Illustration } from '../../assets/undraw_searching_p5ux.svg';
import { useLazyQuery } from '@apollo/client';
import { GET_ANNOUCEMENTS_BY_CATEGORY } from '../../graphql/annoucements';
import { AnnList, Params, QueryData, QueryVars } from './types';
import ErrorMessage from '../../components/ErrorMessage';
import { useCategoryContextState } from '../../context/category/categoryContext';

const AnnoucementsList = () => {
  const [annoucements, setAnnoucements] = useState<AnnList[] | null>(null);
  const location = useLocation();
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const searchParam = location.search ? queryString.parse(location.search).q : '';
  const { categoryName } = useParams<Params>();
  const { categories } = useCategoryContextState();
  const [loadAnnoucements, { data, error, loading }] = useLazyQuery<QueryData, QueryVars>(
    GET_ANNOUCEMENTS_BY_CATEGORY
  );

  useEffect(() => {
    if (categories !== null && !searchParam)
      loadAnnoucements({
        variables: {
          categoryId: (categories.find((el) => el.englishName === categoryName) as any).id,
          search: '',
        },
      });
    else if (searchParam)
      loadAnnoucements({
        variables: {
          categoryId: '',
          search: searchParam,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, categoryName, searchParam]);

  useEffect(() => {
    if (data !== undefined) setAnnoucements(data.getAnnoucements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  if (error) return <ErrorMessage>Wystąpił nieznany błąd.</ErrorMessage>;

  const renderSearch = (search: string): string => {
    return ` - ${search}`;
  };

  const ifRenderSearch = (index: number, size: number, search: string): boolean => {
    return index === size && search !== '';
  };

  const renderCards = (annoucements: AnnList[]): JSX.Element[] | JSX.Element => {
    return annoucements.length ? (
      annoucements.map((el) => (
        <Card
          variant="home"
          key={el.id}
          title={el.title}
          price={el.costs.day}
          _id={el.id}
          images={el.images}
          location={el.location}
        />
      ))
    ) : (
      <Box>
        <Illustration className={classes.illustration} />
        <Typography component="p" variant="h4" align="center">
          Przepraszamy, nie udało się wyszukać podanej frazy.
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth={false} className={classes.wrapper}>
      <AppBar position="sticky" className={classes.header}>
        <Container className={classes.searchContainer} disableGutters>
          <Search slim={true} />
        </Container>
      </AppBar>
      <ViewContainer>
        <Container maxWidth={false} className={classes.contentContainer}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className={classes.link}>
              <Home />
            </Link>
            {pathnames &&
              pathnames.map((path, index) => (
                <span key={path}>
                  {path}
                  {ifRenderSearch(index, pathnames.length - 1, searchParam) &&
                    renderSearch(searchParam)}
                </span>
              ))}
          </Breadcrumbs>
          <ViewTitle>Wyniki wyszukiwania</ViewTitle>
          <CardsContainer>
            {annoucements ? renderCards(annoucements) : <CircularProgress size={60} />}
          </CardsContainer>
        </Container>
      </ViewContainer>
    </Container>
  );
};

export default AnnoucementsList;
