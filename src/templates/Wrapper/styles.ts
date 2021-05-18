import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '1fr',
    },
  },
}));

export default useStyles;
