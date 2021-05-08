import {
  Grid,
  Container,
  InputAdornment,
  Typography,
  makeStyles,
  TextField,
  colors,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  container: {
    width: '100%',
    height: '50%',
    margin: 0,
    paddingInline: theme.spacing(2),
  },
  searchContainer: { backgroundColor: '#9CA3AF' },
  searchInput: {
    width: '90%',
    backgroundColor: colors.grey[50],
    marginTop: theme.spacing(3),
    borderRadius: 4,
  },
  fontResize: {
    fontSize: '1.8rem',
  },
  firstHeading: {
    color: colors.grey[50],
    fontWeight: 500,
  },
}));

const Main = () => {
  const classes = useStyles();

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
