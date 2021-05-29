import { makeStyles, colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: '90%',
    backgroundColor: colors.grey[50],
    marginTop: theme.spacing(3),
    borderRadius: 4,
  },
  fontResize: {
    fontSize: '1.8rem',
  },
}));

export default useStyles;
