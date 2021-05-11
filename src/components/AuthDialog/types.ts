type ContentType = 'signin' | 'signup';
export type SetContentType = React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;

export interface DialogContentProps {
  contentType: ContentType;
  setContentType: SetContentType;
}
