import { Button, TextField, withStyles } from '@material-ui/core';

export const StyledTextField = withStyles(() => ({
  root: {
    maxWidth: '30rem',
    width: '100%',
    '& *': { fontSize: '1.8rem' },
    '& .MuiFormHelperText-root': { fontSize: '1.4rem' },
  },
}))(TextField);

export const StylesButton = withStyles(() => ({
  label: {
    fontSize: '1.6em',
  },
}))(Button);
