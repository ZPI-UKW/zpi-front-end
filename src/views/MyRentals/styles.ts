import { Box, Theme, withStyles } from '@material-ui/core';

export const CardsContainer = withStyles((theme: Theme) => ({
  root: {
    marginTop: '3rem',
    width: '100%',
    maxWidth: '120rem',
    display: 'grid',
    justifyContent: 'center',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
  },
}))(Box);
