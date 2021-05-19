import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import DialogTitle from '../DialogTitle';
import DialogContent from './dialog.content';
import { DialogProps } from './types';

const AuthDialog = ({ isDialogOpen, handleClose }: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [contentType, setContentType] = useState<'signin' | 'signup'>('signin');

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="dialog-title"
      onExited={() => setContentType('signin')}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle handleClose={handleClose}>
        {contentType === 'signin' ? 'Zaloguj się' : 'Zarejestruj się'}
      </DialogTitle>
      <DialogContent contentType={contentType} setContentType={setContentType} />
    </Dialog>
  );
};

export default AuthDialog;
