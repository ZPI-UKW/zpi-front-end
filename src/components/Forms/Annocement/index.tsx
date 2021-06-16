import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useStyles } from './styles';
import { Initial, QueryData, QueryVars } from './types';
import TextFields from './annoucement.textfields';
import { initial } from './annoucement.util';
import { useLocationContextState } from '../../../context/locationContext/locationContext';
import { CircularProgress } from '@material-ui/core';
import SpinnerButton from '../../SpinnerButton';
import FileHandler from './annoucement.file';
import AnnocementControl from './annoucement.control';
import { useMutation } from '@apollo/client';
import { CREATE_ANNOUCEMENT } from '../../../graphql/annoucement';
import DataControl from '../../DataControl/index';
import { useAuthContextState } from '../../../context/authContext';

async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}

const AnnoucementForm = () => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState<Initial>(initial);
  const {
    isMapLoaded,
    isMapError,
    autocomplete: { ready },
  } = useLocationContextState();
  const { logout } = useAuthContextState();

  const [AnnoucementAction, { error, data, loading, called }] =
    useMutation<QueryData, QueryVars>(CREATE_ANNOUCEMENT);

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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const formData = new FormData();
        try {
          let imagesUrl = values.images;
          if (values.images.length > 0) {
            for (let i = 0; i < values.images.length; i++) {
              if (values.images[i]) {
                const file = await dataUrlToFile(values.images[i], `img${i}.png`);
                formData.append('images', file);
              }
            }

            const res = await fetch('http://localhost:8080/add-images', {
              method: 'PUT',
              body: formData,
              credentials: 'include',
            });

            const data = await res.json();
            const links = (data.files as string[]).map(
              (el) => process.env.REACT_APP_SERVER_PATH + el
            );
            imagesUrl = links;
          }

          await AnnoucementAction({
            variables: {
              ...values,
              day: parseFloat(values.costs.day.toString()),
              week: parseFloat(values.costs.week.toString()),
              month: parseFloat(values.costs.month.toString()),
              images: imagesUrl,
              category: '60ac10284fc6210a77f00076',
            },
          });
        } catch {}
        setSubmitting(false);
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
              <FileHandler />
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
          <DataControl
            data={data}
            error={error}
            loading={loading}
            called={called}
            successMsg="Ogłoszenie utworzone pomyslnie."
            onError={(error, status, message) => {
              if (message.includes('validation')) {
                error.message = 'Bląd walidacji.';
              }
              if (status === 401 || status === 404) logout();
            }}
          />
          <AnnocementControl initialValues={initialValues} setInitialValues={setInitialValues} />
        </Form>
      )}
    </Formik>
  );
};

export default AnnoucementForm;
