import { IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import CropperDialog from './annoucement.cropper';
import { deleteImage, onFileChange } from './annoucement.util';
import { useStyles } from './styles';
import { Initial } from './types';

const File = () => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { values, errors, setErrors, setFieldValue } = useFormikContext<Initial>();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleSetCurrentImage = (image: string) => setCurrentImage(image);

  return (
    <>
      {values.images.length < 3 ? (
        <div className={classes.fileInputContainer}>
          <AddIcon color="disabled" />
          <Typography variant="h5" component="p" color="textSecondary">
            Dodaj zdjęcie
          </Typography>
          <input
            className={classes.fileInput}
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={(e) => onFileChange(e, setErrors, openModal, handleSetCurrentImage)}
            accept="image/*"
            aria-describedby="image_error"
          />
        </div>
      ) : null}
      <div className={classes.imagesContainer}>
        {values.images
          ? values.images.map((el, i) => (
              <div className={classes.imgWrapper} key={el}>
                <img src={el} alt="" className={classes.img} />
                <IconButton
                  onClick={() => deleteImage(i, values.images, setFieldValue)}
                  className={classes.deleteIcon}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          : null}
      </div>
      {errors.images ? (
        <Typography variant="h5" component="p" color="error" role="alert" id="image_error">
          {errors.images}
        </Typography>
      ) : null}
      <CropperDialog
        open={isModalOpen}
        closeModal={() => {
          closeModal();
          setCurrentImage(null);
          if (fileInputRef.current?.value) fileInputRef.current.value = '';
        }}
        currentImage={currentImage}
        setFieldValue={setFieldValue}
        images={values.images}
        setErrors={setErrors}
      />
    </>
  );
};

export default File;
