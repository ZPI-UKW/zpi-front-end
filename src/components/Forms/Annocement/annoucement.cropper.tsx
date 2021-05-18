import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useCallback, useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import DialogTitle from '../../DialogTitle';
import { getCroppedImg } from './annoucement.util';
import { StyledButton, StyledDialogContent } from './styles';

const CropperDialog = ({
  open,
  closeModal,
  currentImage,
  images,
  setFieldValue,
}: {
  open: boolean;
  closeModal: () => void;
  currentImage: string | null;
  images: string[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    if (!currentImage) closeModal();
  }, [currentImage, closeModal]);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      if (currentImage && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(currentImage, croppedAreaPixels);
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
          image={currentImage || undefined}
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
