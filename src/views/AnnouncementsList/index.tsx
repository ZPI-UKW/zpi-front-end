import { useEffect, useState } from 'react';
import Card from '../../components/ProductCard/card';
import { Annoucements, annoucements as ann } from '../../data/annoucements';
import CardsContainer from '../../components/CardsContainer';
import ViewTitle from '../../components/ViewTitle';
import ViewContainer from '../../components/ViewContainer';
import { useLocation } from 'react-router';
import { AppBar, Breadcrumbs, CircularProgress, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';
import useStyles from './styles';
import queryString from 'query-string';
import Search from '../../components/Search';

const AnnoucementsList = () => {
  const [annoucements, setAnnoucements] = useState<Annoucements[] | null>(null);
  const location = useLocation();
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const searchParam = location.search ? queryString.parse(location.search).q : '';

  useEffect(() => {
    const filtered = ann.filter((item) => item.title.includes(searchParam));
    setTimeout(() => setAnnoucements(filtered), 2000);
    return () => {
      setAnnoucements(null);
    };
  }, [searchParam]);

  const renderSearch = (search: string): string => {
    return ` - ${search}`;
  };

  const ifRenderSearch = (index: number, size: number, search: string): boolean => {
    return index === size && search !== '';
  };

  const renderCards = (annoucements: Annoucements[]): JSX.Element[] | string => {
    return annoucements.length
      ? annoucements.map((el) => (
          <Card
            variant="home"
            key={el._id}
            title={el.title}
            price={el.costs.day}
            _id={el._id}
            images={el.images}
            categoryId={el.categoryId}
            location={el.location}
          />
        ))
      : 'Nothing found';
  };

  return (
    <ViewContainer>
      <AppBar position="sticky" className={classes.header}>
        <Container className={classes.searchContainer} disableGutters>
          <Search slim={true} />
        </Container>
      </AppBar>
      <Container className={classes.contentContainer}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" className={classes.link}>
            <Home />
          </Link>
          {pathnames &&
            pathnames.map((path, index) => (
              <span>
                {path}
                {ifRenderSearch(index, pathnames.length - 1, searchParam) &&
                  renderSearch(searchParam)}
              </span>
            ))}
        </Breadcrumbs>
        <ViewTitle>Wyniki wyszukiwania</ViewTitle>
        <CardsContainer>
          {annoucements ? (
            renderCards(annoucements)
          ) : (
            <CircularProgress size={60} className={classes.spinner} />
          )}
        </CardsContainer>
      </Container>
    </ViewContainer>
  );
};

export default AnnoucementsList;
