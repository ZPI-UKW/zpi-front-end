import { makeStyles, Theme, colors } from '@material-ui/core';

const useStyle = makeStyles<Theme, { bgColor: string }>((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    cursor: 'pointer',
  },
  box: {
    width: '38px',
    height: '38px',
    padding: theme.spacing(1),
    backgroundColor: ({ bgColor }) => bgColor,
    marginInlineEnd: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.grey[100],
    fontSize: '3rem',
    [theme.breakpoints.up('sm')]: {
      marginInlineStart: '25%',
      width: '68px',
      height: '68px',
      fontSize: '6rem',
    },
  },
  typography: {
    fontWeight: 500,
  },
}));

export default useStyle;
