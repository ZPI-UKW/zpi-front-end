import { DialogTitleProps } from './types';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Theme, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const StyledDialogTitle = withStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& svg, & h2': {
      fontSize: '3rem',
    },
  },
}))(MuiDialogTitle);

const DialogTitle = ({ children, handleClose }: DialogTitleProps) => {
  return (
    <StyledDialogTitle id="dialog-title" disableTypography>
      <Typography variant="h2">{children}</Typography>
      <IconButton size="medium" edge="end" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </StyledDialogTitle>
  );
};

export default DialogTitle;
