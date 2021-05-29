import { makeStyles, colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    color: colors.grey[900],
  },
  searchContainer: {
    paddingBlock: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBlockStart: theme.spacing(1),
  },
  header: {
    backgroundColor: '#9CA3AF',
    boxShadow: 'none',
  },
}));

export default useStyles;
