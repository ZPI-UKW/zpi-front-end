import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { StyledTextField, StylesButton } from '../../CustomControls/styles';
import { ChangeUserDataSchema } from '../../../validation/modifyuserdata.validation';
import useStyles from './styles';
import { useAuthContextState } from '../../../context/authContext';
import _ from 'lodash';

const ChangeUserData = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { userInfo } = useAuthContextState();

  return (
    <Formik
      initialValues={{ ..._.omit(userInfo, '_id') }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 1500);
      }}
      validationSchema={ChangeUserDataSchema}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Grid container className={classes.root} spacing={matches ? 0 : 2}>
            <Grid item xs={12}>
              <Typography className={classes.subTitle} variant="h4">
                Dane
              </Typography>
            </Grid>
            <Grid item container xs={12} sm={6} direction="column" alignItems="center">
              <Field
                name="name"
                as={StyledTextField}
                label="Imię"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="lastname"
                as={StyledTextField}
                label="Nazwisko"
                error={touched.lastname && Boolean(errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid item container xs={12} sm={6} direction="column" alignItems="center">
              <Field
                name="email"
                as={StyledTextField}
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="phonenumber"
                as={StyledTextField}
                label="Telefon"
                error={touched.phonenumber && Boolean(errors.phonenumber)}
                helperText={touched.phonenumber && errors.phonenumber}
              />
            </Grid>
            <Grid item container={matches} xs={12} justify="center">
              <StylesButton
                className={classes.button}
                variant="contained"
                disabled={isSubmitting}
                color="primary"
                type="submit"
              >
                Zapisz
              </StylesButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeUserData;