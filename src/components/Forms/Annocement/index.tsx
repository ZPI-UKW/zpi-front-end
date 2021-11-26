import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useStyles } from './styles';
import { Initial, QueryData, QueryVars, RouteParams } from './types';
import TextFields from './annoucement.textfields';
import { dataUrlToFile, initial } from './annoucement.util';
import SpinnerButton from '../../SpinnerButton';
import FileHandler from './annoucement.file';
import AnnocementControl from './annoucement.control';
import { useMutation } from '@apollo/client';
import { CREATE_ANNOUCEMENT, EDIT_ANNOUCEMENT } from '../../../graphql/annoucement';
import DataControl from '../../DataControl/index';
import { useAuthContextState } from '../../../context/auth/authContext';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AnnoucementActionSchema } from '../../../validation/annoucement.validation';

const  AnnoucementForm = () => {
  const { pathname } = useLocation();
  const { addId } = useParams<RouteParams>();
  const classes = useStyles();
  const mode = pathname.includes('edit-advertisement');
  const [initialValues, setInitialValues] = useState<Initial>(initial);
  const { logout } = useAuthContextState();
  const history = useHistory();

  const [AnnoucementAction, { error, data, loading, called }] = useMutation<QueryData, QueryVars>(
    mode ? EDIT_ANNOUCEMENT : CREATE_ANNOUCEMENT
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={AnnoucementActionSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const formData = new FormData();
        const existingImg = values.images.filter((el) => el.includes('http'));
        const newImgs = values.images.filter((el) => !el.includes('http'));
        try {
          let imagesUrl = existingImg;
          if (newImgs.length > 0) {
            for (let i = 0; i < newImgs.length; i++) {
              if (newImgs[i]) {
                const file = await dataUrlToFile(newImgs[i], `img${i}.png`);
                formData.append('images', file);
              }
            }

            const res = await fetch(`${process.env.REACT_APP_BACK_END_URL}/add-images`, {
              method: 'POST',
              body: formData,
              credentials: 'include',
            });

            const data = await res.json();
            const links = data.files;
            imagesUrl = [...existingImg, ...links];
          }

          const dataToSend: QueryVars = {
            ...values,
            day: parseFloat(values.costs.day.toString()),
            week: parseFloat(values.costs.week.toString()),
            month: parseFloat(values.costs.month.toString()),
            images: imagesUrl,
            phone: values.phonenumber,
          };

          if (mode) dataToSend.id = addId;
          else dataToSend.category = values?.categoryId;

          await AnnoucementAction({
            variables: {
              ...dataToSend,
            },
          });

          console.log(mode)
          if(mode) history.push('/my-advertisements');
          else resetForm();
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
            {mode ? 'Edytuj ogłoszenie' : 'Dodaj ogłoszenie'}
          </SpinnerButton>
          <DataControl
            data={data}
            error={error}
            loading={loading}
            called={called}
            successMsg={mode ? "Ogłoszenie zaktualizowane pomyslnie." : "Ogłoszenie utworzone pomyslnie."}
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
