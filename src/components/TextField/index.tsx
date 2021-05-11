import { TextField, Theme, withStyles } from '@material-ui/core';

export const StyledTextField = withStyles((theme: Theme) => ({
  root: {
    height: '7rem',
  },
}))(TextField);

export default StyledTextField;
