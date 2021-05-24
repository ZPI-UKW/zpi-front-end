import { makeStyles } from '@material-ui/core';
import hexRgb from 'hex-rgb';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 5,

    [theme.breakpoints.up('sm')]: {
      position: 'static',
      margin: '1.5rem 0',
      display: 'flex',
      alignItems: 'center',
    },
  },
  link: {
    color: theme.palette.grey[50],
    '& > svg ': {
      fontSize: '1.8rem',
    },

    [theme.breakpoints.up('sm')]: {
      color: theme.palette.primary.main,
      '& > svg ': {
        fontSize: '2.2rem',
      },
    },
  },
  image: {
    height: '30vh',
    objectFit: 'cover',

    [theme.breakpoints.up('sm')]: {
      borderRadius: theme.shape.borderRadius,
      height: '40rem',
    },
  },
  content: {
    padding: theme.spacing(1.5),

    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
    },
  },
  rentContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1.5rem 0',

    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },

    '& > button': {
      color: theme.palette.grey[50],
      width: '65%',
      fontSize: '1.4rem',

      [theme.breakpoints.up('sm')]: {
        width: '100%',
        fontSize: '2rem',
      },
    },
  },
  paper: {
    marginBottom: '1.5rem',
    padding: theme.spacing(1),

    '& p': {
      fontSize: '1.6rem',
    },
  },
  paperTitle: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      fontSize: '2.5rem',
      marginRight: theme.spacing(0.75),
    },
  },
  costs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  description: { marginTop: theme.spacing(1) },
  sliderControl: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    padding: theme.spacing(0.25),
    background: hexRgb(theme.palette.grey[50], { format: 'css', alpha: 0.5 }),

    '& svg': {
      fontSize: '3rem',

      [theme.breakpoints.up('sm')]: {
        fontSize: '4.5rem',
      },
    },

    '&.start': {
      left: theme.spacing(1),
    },

    '&.end': {
      right: theme.spacing(1),
    },
  },
}));

export default useStyles;
