import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40rem',
    },
  },
  datePicker: {
    '& *': {
      fontSize: '1.6rem',
    },
  },
  pickersWrapper: {
    display: 'grid',
    marginBottom: '2rem',
    justifyContent: 'center',

    '& > div': {
      margin: '1rem 0',
    },

    [theme.breakpoints.up('sm')]: {
      gap: '3rem',
      gridTemplateColumns: '1fr 1fr',

      '& > div': {
        margin: 0,
      },
    },
  },
  contentWrapper: {
    '& h4': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& p': {
      fontSize: '1.8rem',
    },
  },
}));
