import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100rem',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: 0,
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
