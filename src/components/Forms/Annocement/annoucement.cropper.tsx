import { Dialog, DialogActions } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import DialogTitle from '../../DialogTitle';
import { getCroppedImg } from './annoucement.util';
import { StyledButton, StyledDialogContent } from './styles';

const CropperDialog = ({
  open,
  closeModal,
  image,
  images,
  setFieldValue,
}: {
  open: boolean;
  closeModal: () => void;
  image: string | null;
  images: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (!image) closeModal();
  }, [image, closeModal]);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        setFieldValue('images', [...images, croppedImage]);
      }
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle handleClose={closeModal}>Dopasuj zdjęcie</DialogTitle>
      <StyledDialogContent>
        <Cropper
          image={image || undefined}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </StyledDialogContent>
      <DialogActions>
        <StyledButton onClick={closeModal}>Anuluj</StyledButton>
        <StyledButton onClick={handleSave} variant="contained" color="primary">
          Dodaj
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CropperDialog;
