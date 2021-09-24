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
    padding: 0,
    paddingBlockStart: theme.spacing(1),
  },
  header: {
    backgroundColor: '#9CA3AF',
    boxShadow: 'none',
  },
  illustration: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 400,
    margin: '100px 0',
  },
  box: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  wrapper: {
    width: '100%',
    padding: 0,
  },
}));

export default useStyles;
