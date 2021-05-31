import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';

export const StyledDialogTitle = withStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& svg, & h2': {
      fontSize: '3rem',
    },
  },
}))(MuiDialogTitle);
