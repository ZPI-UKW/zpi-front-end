import { Button, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'grid',
      height: 'fit-content',
      width: '100%',
      maxWidth: '24rem',

      [theme.breakpoints.up('sm')]: {
        maxWidth: '28rem',
      },
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      margin: '4rem 0',
    },
    message: {
      marginRight: '0.5rem',
      color: theme.palette.grey[400],
    },
    link: {
      fontWeight: 500,
      cursor: 'pointer',
    },
  })
);

export const StyledButton = withStyles((theme: Theme) => ({
  root: {
    width: '75%',
    minWidth: '14rem',
    margin: '0 auto',
    marginTop: '4rem',

    [theme.breakpoints.up('sm')]: {
      width: '75%',
    },
  },
  label: {
    fontSize: '1.1rem',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
    },
  },
}))(Button);
