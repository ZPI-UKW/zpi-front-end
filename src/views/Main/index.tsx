import {
  Grid,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  GridSpacing,
} from '@material-ui/core';
import Category from '../../components/Category';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';
import { useCategoryContextState } from '../../context/category/categoryContext';
import { Category as ICategory } from '../../context/category/types';

const Main = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { categories } = useCategoryContextState();

  const setSpacing = (matches: boolean): GridSpacing => (matches ? 2 : 4);

  const renderCategories = (categories: ICategory[] | null): JSX.Element[] | null => {
    return (
      categories &&
      categories.map((item: ICategory, index: number) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link to={`/search/category/${item.englishName}`}>
            <Category name={item.name} icon={item.englishName} />
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
          <Search />
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
