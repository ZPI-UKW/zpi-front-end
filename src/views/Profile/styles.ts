import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: '60rem',
    width: '100%',
    margin: '0 auto',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
