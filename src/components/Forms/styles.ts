import { Button, createStyles, makeStyles, TextField, Theme, withStyles } from '@material-ui/core';

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
    passwordInput: {
      height: '7rem',
    },
    buttonWrapper: {
      marginTop: '4rem',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '& > button': {
        margin: 0,
      },
    },
    buttonProgress: {
      position: 'absolute',
    },
  })
);

export const StyledButton = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    marginTop: '4rem',

    [theme.breakpoints.up('sm')]: {
      width: '75%',
    },
  },
  label: {
    fontSize: '1.6rem',
  },
}))(Button);

export const StyledTextField = withStyles((theme: Theme) => ({
  root: {
    height: '7rem',
  },
}))(TextField);
