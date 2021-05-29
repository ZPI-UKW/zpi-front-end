import { makeStyles, colors, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, { slim: boolean }>((theme) => ({
  searchInput: {
    width: '90%',
    backgroundColor: colors.grey[50],
    borderRadius: 4,
  },
  fontResize: {
    fontSize: '1.8rem',
    paddingBlock: ({ slim }) => (slim ? theme.spacing(1) : theme.spacing(2)),
  },
}));

export default useStyles;
