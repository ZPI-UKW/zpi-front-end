import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  addItemBox: {
    height: '100%',
    background: '#E5E7EB',
    color: '#9CA3AF',
    display: 'grid',
    placeItems: 'center',
    borderRadius: theme.shape.borderRadius,
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  plusIcon: {
    width: '25%',
    height: '25%',
    strokeWidth: '1px',
  },
  gridItem: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
