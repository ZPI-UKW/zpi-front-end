import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';
import Files from 'react-files'
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useStyles } from './styles';
import { AgreementProps } from './types';

const Agreement = ({handleClose, open, reservationId}: AgreementProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [pdf, setPdf] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleChangeImg = (file: any) => {
    if (file[0] && file[0]?.extension && file[0]?.extension === 'pdf') setPdf(file[0]);
  };

  const uploadImg = async () => {
    if(pdf !== null) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('agreement', new Blob([pdf], { type: pdf.type }), pdf.name || 'file');
        await fetch(`${process.env.REACT_APP_BACK_END_URL}/upload-pdf/${reservationId}`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        enqueueSnackbar('Umowa przesłana pomyślnie!', {variant: 'success'});
        handleClose();
      } catch (e) {
        enqueueSnackbar('Wystąpił błąd podczas przesyłania umowy!', {variant: 'error'});
      } finally {
        setLoading(false);
      }
    }
  }

  const handleError = (error: any) => {
    if(error.code === 2) enqueueSnackbar('Plik jest za duży! Maksymalnie 3MB!', {variant: 'error'});
    else enqueueSnackbar('Wystąpił nieznany błąd!', {variant: 'error'});
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="agreement-modal-title"
      aria-describedby="agreement-modal-description"
    >
      <DialogTitle><Typography variant="h3" component="span" >Prześlij umowę</Typography></DialogTitle>
      <DialogContent>
        <div>
          <Files
            accepts={['application/pdf']}
            maxFiles={1}
            multiple={false}
            maxFileSize={3000000}
            onChange={handleChangeImg}
            onError={handleError}
          >
            <div className={classes.fileUpload}>
              <Typography variant="h5" component="span" className={classes.fileUploadTitle}>{pdf !== null && pdf.name ? pdf.name : "Dodaj plik pdf"}</Typography>
            </div>
          </Files>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <Typography variant="h5" component="p" >Anuluj</Typography>
        </Button>
        <Button onClick={uploadImg} color="primary" disabled={loading}>
          <Typography variant="h5" component="p">Prześlij</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Agreement;