import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontSize: '2.5rem',
    marginTop: '3rem',
  },
  button: {
    marginTop: '1rem',
  },
  root: {
    '& .MuiFormControl-root': {
      margin: '0.5rem 0',
    },
  },
}));

export default useStyles;
