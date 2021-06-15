import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontSize: '2.5rem',
    margin: '2.5rem 0 0.5rem',
  },
  wrapper: {
    margin: '3rem 0',
    width: 'fit-content',
  },
  root: {
    '& .MuiFormControl-root': {
      margin: '0.75rem 0',
    },
  },
}));

export default useStyles;
