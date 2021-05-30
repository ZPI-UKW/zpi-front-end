import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { StylesButton } from '../../CustomControls/styles';
import { ChangePasswordSchema } from '../../../validation/modifyuserdata.validation';
import useStyles from './styles';
import PasswordField from '../../CustomControls/password.control';

const ChangePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 1500);
      }}
      validationSchema={ChangePasswordSchema}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Grid container className={classes.root} spacing={matches ? 0 : 2}>
            <Grid item xs={12}>
              <Typography className={classes.subTitle} variant="h4">
                Zmień hasło
              </Typography>
            </Grid>
            <Grid item container xs={12} sm={6} justify="center">
              <Field
                name="currentPassword"
                label="Nowe hasło"
                error={touched.currentPassword && Boolean(errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                as={PasswordField}
              />
            </Grid>
            <Grid item container xs={12} sm={6} justify="center">
              <Field
                name="newPassword"
                label="Stare hasło"
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                as={PasswordField}
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
                Zmień
              </StylesButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
