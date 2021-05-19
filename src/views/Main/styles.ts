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