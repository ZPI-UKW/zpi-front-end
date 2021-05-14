import { Grid, Container, InputAdornment, Typography, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import useStyles from './styles';
import { data } from '../../components/Category/categories.data';
import { category, categoryData } from '../../components/Category/category.interface';

const getData = (data: categoryData): category[] => {
  return data.categories;
};

const Main = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState<category[] | null>(null);

  useEffect(() => setCategories(getData(data)), []);
  console.log(categories);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
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
        <Typography variant="h4" component="h2">
          Kategorie
        </Typography>
      </Container>
    </Grid>
  );
};

export default Main;
