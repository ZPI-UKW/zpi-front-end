import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  msg: {
    fontSize: '3rem',

    [theme.breakpoints.up('sm')]: {
      fontSize: '4rem',
    },
  },

  icon: {
    fontSize: '3rem',
    marginRight: '1rem',

    [theme.breakpoints.up('sm')]: {
      fontSize: '4.25rem',
      marginRight: '3rem',
    },
  },
}));

export default useStyles;
