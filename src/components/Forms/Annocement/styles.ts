import { Button, DialogContent, makeStyles, TextField, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export const useStyles = makeStyles((theme) => ({
  flexWrapper: {
    paddingTop: theme.spacing(),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrapper: {
    width: '30rem',
    margin: `${theme.spacing()}px 0`,
    position: 'relative',
  },
  img: { width: '100%' },
  fileInputContainer: {
    position: 'relative',
    width: '30rem',
    height: '18.5rem',
    backgroundColor: theme.palette.grey[300],
    margin: `${theme.spacing()}px 0`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    '& > svg': {
      fontSize: '4.5rem',
    },
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    opacity: 0,
  },
  deleteIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '3.5rem',
    height: '3.5rem',
    background: theme.palette.grey[50],
    color: theme.palette.error.main,
    '& svg': {
      fontSize: '2rem',
    },
  },
}));

export const StyledTextField = withStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '30rem',
    marginBottom: theme.spacing(2.5),

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

export const StyledDialogContent = withStyles(() => ({
  root: {
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',
    height: '30rem',
    width: '50rem',
  },
}))(DialogContent);

export const StyledAutocomplete = withStyles(() => ({
  root: {
    width: '100%',
  },
  option: {
    fontSize: '1.6rem',
  },
  noOptions: {
    fontSize: '1.6rem',
  },
  loading: {
    fontSize: '1.6rem',
  },
}))(Autocomplete);
