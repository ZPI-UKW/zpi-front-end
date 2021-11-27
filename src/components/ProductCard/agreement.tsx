import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';
import Files from 'react-files'
import { useEffect, useState } from 'react';

const Agreement = ({handleClose,open}: {open: boolean; handleClose: () => void}) => {
  const [img, setImg] = useState<any>(null);
  const handleChangeImg = (file: any) => {
    console.log(file[0].extension, file[0])
    if (file[0] && file[0].extension === 'pdf' && file[0].type === "application/pdf") setImg(file[0]);

  };

  const uploadImg = async () => {
    if(img !== null) {
      try {
        const formData = new FormData();
        formData.append('agreement', new Blob([img], { type: img.type }), img.name || 'file');
        formData.append('reservationId', "61a226e53daee90520e0d38a");
        const res = await fetch(`${process.env.REACT_APP_BACK_END_URL}/upload-pdf/61a226e53daee90520e0d38a`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    console.log("File: ", img);
  }, [img])

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
            multiple={false}
            maxFileSize={10000000}
            onChange={handleChangeImg}
          >
            <div style={{background: 'red'}}>
              Upload file
            </div>
          </Files>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <Typography variant="h5" component="p" >Anuluj</Typography>
        </Button>
        <Button onClick={uploadImg} color="primary">
          <Typography variant="h5" component="p" >Prześlij</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Agreement;