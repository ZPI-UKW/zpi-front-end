import { Grid, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useAuthContextState } from '../../../context/authContext';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { StyledButton, useStyles } from './styles';
import { useEffect, useRef, useState } from 'react';
import { Initial, RouteParams } from './types';
import TextFields from './annoucement.textfields';
import { initial, onFileChange, routeType } from './annoucement.util';
import CropperDialog from './annoucement.cropper';
import AddIcon from '@material-ui/icons/Add';

const AnnoucementForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState<Initial>(initial);
  const { userInfo } = useAuthContextState();
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleSetCurrentImage = (image: string) => setCurrentImage(image);

  useEffect(() => {
    routeType(pathname, initialValues, params, userInfo, setInitialValues, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, params]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, touched, errors, setFieldValue, setErrors }) => (
        <Form>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={classes.flexWrapper}>
                <TextFields touched={touched} errors={errors} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h3">
                Galeria zdjęć (max 3)
              </Typography>
              <Typography variant="subtitle1" component="p">
                Maksymalny rozmiar zdjęcia to 1MB
              </Typography>
              <div className={classes.imagesContainer}>
                {values.images &&
                  values.images.map((el) => <img src={el} className={classes.img} alt="" />)}
              </div>
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
                    onChange={(e) => {
                      onFileChange(e, setErrors, values.images, openModal, handleSetCurrentImage);
                    }}
                    accept="image/*"
                    aria-describedby="image_error"
                  />
                </div>
              ) : null}
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
                image={currentImage}
                setFieldValue={setFieldValue}
                images={values.images}
              />
            </Grid>
          </Grid>
          <div className={classes.flexWrapper}>
            <StyledButton type="submit" variant="contained" color="primary">
              Dodaj ogłoszenie
            </StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AnnoucementForm;
