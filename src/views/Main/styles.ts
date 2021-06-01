import { makeStyles, colors } from '@material-ui/core';

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
  searchContainer: {
    backgroundColor: '#9CA3AF',
    [theme.breakpoints.down('xs')]: {
      height: '300px',
    },
  },
  firstHeading: {
    color: colors.grey[50],
    fontWeight: 500,
    marginBlockEnd: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '4rem',
    },
  },
  secondHeading: {
    color: colors.grey[900],
    fontWeight: 400,
    width: '100%',
    textAlign: 'center',
    marginBlock: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginBlock: theme.spacing(4),
    },
  },
  categoryGrid: {
    marginBlockStart: theme.spacing(),
  },
}));

export default useStyles;
