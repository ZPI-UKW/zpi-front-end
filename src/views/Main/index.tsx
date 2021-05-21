import {
  Grid,
  Container,
  InputAdornment,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
  GridSpacing,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import Category from '../../components/Category';
import useStyles from './styles';
import { data } from '../../components/Category/categories.data';
import { category, categoryData } from '../../components/Category/category.interface';
import { Link, useHistory } from 'react-router-dom';

const getData = (data: categoryData): category[] => {
  return data.categories;
};

const Main = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const history = useHistory();

  const [categories, setCategories] = useState<category[] | null>(null);
  const [searchValue, setSearchValue] = useState<String>('');

  useEffect(() => setCategories(getData(data)), []);

  const setSpacing = (matches: boolean): GridSpacing => {
    return matches ? 2 : 4;
  };

  const search = (value: String): void => {
    history.push({
      pathname: '/search',
      search: `?q=${value}`,
    });
  };

  const renderCategories = (categories: category[] | null): JSX.Element[] | null => {
    return (
      categories &&
      categories.map((item: category, index: number) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link to={`/search/category/${item.name}`}>
            <Category name={item.name} icon={item.icon} />
          </Link>
        </Grid>
      ))
    );
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignContent="flex-start"
      className={classes.grid}
    >
      <Container className={`${classes.container} ${classes.searchContainer}`} maxWidth={false}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
          <Typography variant="h1" component="h1" className={classes.firstHeading}>
            Czego szukasz?
          </Typography>
          <TextField
            id="search-input"
            placeholder="Wpisz..."
            variant="outlined"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyPress={(e) => e.key === 'Enter' && search(searchValue)}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="large" />
                </InputAdornment>
              ),
              classes: {
                input: classes.fontResize,
              },
            }}
          />
        </Grid>
      </Container>
      <Container className={classes.container} maxWidth={false}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignContent="flex-start"
          className={classes.grid}
        >
          <Typography variant="h2" component="h2" className={classes.secondHeading}>
            Kategorie
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={setSpacing(matches)}
            className={classes.categoryGrid}
          >
            {renderCategories(categories)}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Main;
