import { Button, makeStyles, TextField, withStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  flexWrapper: {
    paddingTop: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
    },
  },
}));

export const StyledTextField = withStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '30rem',
    height: '7rem',
    marginBottom: theme.spacing(1),

    '& *': {
      fontSize: '1.7rem',
    },
  },
}))(TextField);

export const StyledButton = withStyles(() => ({
  root: {
    fontSize: '1.5rem',
  },
}))(Button);
