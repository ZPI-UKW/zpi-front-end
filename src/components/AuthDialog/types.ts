type ContentType = 'signin' | 'signup';
export type SetContentType = React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;

export interface DialogProps {
  isDialogOpen: boolean;
  handleClose: () => void;
  contentType: ContentType;
}

export interface DialogTitleProps {
  handleClose: () => void;
  children: string;
}

export interface DialogContentProps {
  contentType: ContentType;
  setContentType: SetContentType;
}
