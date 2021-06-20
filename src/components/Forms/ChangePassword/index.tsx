import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { ChangePasswordSchema } from '../../../validation/modifyuserdata.validation';
import useStyles from './styles';
import PasswordField from '../../CustomControls/password.control';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../../../graphql/user';
import { QueryData, QueryVars } from './types';
import DataControl from '../../DataControl';
import { useAuthContextState } from '../../../context/auth/authContext';
import SpinnerButton from '../../SpinnerButton';

const ChangePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { logout } = useAuthContextState();
  const [ChangePassword, { error, data, loading, called }] =
    useMutation<QueryData, QueryVars>(CHANGE_PASSWORD);

  return (
    <Formik
      initialValues={{ currentPassword: '', newPassword: '' }}
      onSubmit={async (values) => {
        try {
          await ChangePassword({
            variables: { ...values },
          });
        } catch {}
      }}
      validationSchema={ChangePasswordSchema}
    >
      {({ touched, errors, isSubmitting, setFieldError, resetForm }) => (
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
              <SpinnerButton
                wrapperClassName={classes.wrapper}
                variant="contained"
                isLoading={isSubmitting}
                color="primary"
                type="submit"
              >
                Zmień
              </SpinnerButton>
            </Grid>
          </Grid>
          <DataControl
            data={data}
            error={error}
            loading={loading}
            called={called}
            successMsg="Hasło zmienione pomyślnie."
            onError={(error, status, message) => {
              if (message === 'Invalid password' && status === 404) {
                error.message = '';
                setFieldError('currentPassword', 'Błędne hasło.');
              }
              if (status === 401) logout();
            }}
            onSuccess={() => {
              resetForm();
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
