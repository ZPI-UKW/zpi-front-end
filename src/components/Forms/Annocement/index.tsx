import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useStyles } from './styles';
import { Initial } from './types';
import TextFields from './annoucement.textfields';
import { initial } from './annoucement.util';
import { useLocationContextState } from '../../../context/locationContext/locationContext';
import { CircularProgress } from '@material-ui/core';
import SpinnerButton from '../../SpinnerButton';
import File from './annoucement.file';
import AnnocementControl from './annoucement.control';

const AnnoucementForm = () => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState<Initial>(initial);
  const {
    isMapLoaded,
    isMapError,
    autocomplete: { ready },
  } = useLocationContextState();

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
          Wystąpił błąd podczas dodawania ogłoszenia. Spróbuj ponownie później.
        </Typography>
      </div>
    );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({ touched, errors, isSubmitting }) => (
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
              <File />
            </Grid>
          </Grid>
          <SpinnerButton
            type="submit"
            variant="contained"
            color="primary"
            isLoading={isSubmitting}
            wrapperClassName={classes.buttonWrapper}
          >
            Dodaj ogłoszenie
          </SpinnerButton>
          <AnnocementControl initialValues={initialValues} setInitialValues={setInitialValues} />
        </Form>
      )}
    </Formik>
  );
};

export default AnnoucementForm;
