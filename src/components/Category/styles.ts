import { makeStyles, Theme, colors } from '@material-ui/core';

const useStyle = makeStyles<Theme, { bgColor: string }>((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyItems: 'flex-start',
    alignItems: 'center',
  },
  box: {
    width: '48px',
    height: '48px',
    padding: theme.spacing(1),
    backgroundColor: ({ bgColor }) => bgColor,
    marginInlineEnd: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.grey[900],
  },
  typography: {
    fontWeight: 500,
  },
  icon: {
    fontSize: '32px',
  },
}));

export default useStyle;
