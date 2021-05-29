import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: '1.5rem',
  },
  buttonProgress: {
    position: 'absolute',
  },
}));
