import { IconButton, Typography, withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const StyledDialogTitle = withStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& svg, & h2': {
      fontSize: '3rem',
    },
  },
}))(MuiDialogTitle);

const DialogTitle = ({
  children,
  handleClose,
  ...props
}: {
  children: string;
  handleClose: () => void;
}) => (
  <StyledDialogTitle disableTypography {...props}>
    <Typography variant="h2">{children}</Typography>
    <IconButton size="medium" edge="end" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  </StyledDialogTitle>
);

export default DialogTitle;
