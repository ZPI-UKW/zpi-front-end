import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40rem',
    },
  },
  datePicker: {
    fontSize: '2rem',

    '& *': {
      fontSize: '1.8rem',
    },
  },
}));
