import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  menu: {
    '& li': {
      fontSize: '1.8rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.8rem',
      },
    },
    '& a': {
      color: theme.palette.primary.main,
    },
    '& .logout': {
      color: theme.palette.error.main,
    },
  },
  paper: {
    width: '100%',
    maxWidth: '100%',
    left: 0,
    right: 0,
  },
}));
