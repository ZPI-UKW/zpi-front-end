import { Grid, makeStyles, Theme } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    width: '100%',
    marginBlockStart: '3rem',
  },
}));

const CardsContainer = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid} justify="flex-start">
      {children}
    </Grid>
  );
};

export default CardsContainer;
