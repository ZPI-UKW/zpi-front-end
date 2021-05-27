import { IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { StyledDialogTitle } from './styles';
import { DialogTitleProps } from './types';

const DialogTitle = ({ children, handleClose, id, ...props }: DialogTitleProps) => (
  <StyledDialogTitle disableTypography {...props}>
    <Typography variant="h2" id={id}>
      {children}
    </Typography>
    <IconButton size="medium" edge="end" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  </StyledDialogTitle>
);

export default DialogTitle;
