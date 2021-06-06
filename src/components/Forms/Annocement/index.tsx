import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAuthContextState } from '../../../context/authContext';
import { StyledButton, useStyles } from './styles';
import { Initial, RouteParams } from './types';
import TextFields from './annoucement.textfields';
import { initial, onFileChange, routeType, deleteImage } from './annoucement.util';
import CropperDialog from './annoucement.cropper';
import { useLocationContextState } from '../../../context/locationContext/locationContext';
import { CircularProgress } from '@material-ui/core';

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
  const {
    isMapLoaded,
    isMapError,
    autocomplete: { ready },
  } = useLocationContextState();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleSetCurrentImage = (image: string) => setCurrentImage(image);

  useEffect(() => {
    routeType(pathname, initialValues, params, userInfo, setInitialValues, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, params]);

  if (isMapLoaded && !ready)
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );

  if (isMapError)
    return (
      <div className={classes.loaderWrapper}>
        <Typography variant="h3">
          Wystąpił błąd podczas dodawanie ogłoszenia. Spróbuj ponownie później.
        </Typography>
      </div>
    );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, touched, errors, setFieldValue, setErrors }) => (
        <Form>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.flexWrapper}>
              <TextFields touched={touched} errors={errors} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.flexWrapper}>
              <Typography variant="h4" component="h3">
                Galeria zdjęć (max 3)
              </Typography>
              <Typography variant="subtitle1" component="p">
                Maksymalny rozmiar zdjęcia to 1MB
              </Typography>
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
                      onFileChange(e, setErrors, openModal, handleSetCurrentImage);
                    }}
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
