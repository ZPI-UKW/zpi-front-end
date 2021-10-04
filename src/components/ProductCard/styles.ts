import { fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: fade(theme.palette.grey[50], 0.75),
    backdropFilter: 'blur(4px)',
    zIndex: 10,
  },
  moreBtn: {
    '& svg': {
      transform: 'scale(1.6)',
    },
  },
  listElement: {
    '& li': {
      fontSize: '1.75rem',
    },
  },
  title: {
    fontWeight: 700,
    fontSize: '1.8rem',
  },
  location: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1.8rem 1fr',
  },
  price: {
    color: '#1E3A8A',
  },
  marginTop: {
    marginTop: '2rem',
  },
  gridItem: {
    padding: theme.spacing(2),
  },
}));
