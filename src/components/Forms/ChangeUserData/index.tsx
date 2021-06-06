import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { StyledTextField } from '../../CustomControls/styles';
import { ChangeUserDataSchema } from '../../../validation/modifyuserdata.validation';
import useStyles from './styles';
import { useAuthContextState } from '../../../context/authContext';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { CHANGE_USER_DATA } from '../../../graphql/user';
import { QueryData, QueryVars } from './types';
import DataControl from '../../DataControl';
import SpinnerButton from '../../SpinnerButton';

const ChangeUserData = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { userInfo, setAuthInfo, logout } = useAuthContextState();
  const [ChangeUserData, { error, data, loading, called }] =
    useMutation<QueryData, QueryVars>(CHANGE_USER_DATA);

  return (
    <Formik
      initialValues={{ ..._.omit(userInfo, '_id') }}
      onSubmit={async (values) => {
        try {
          await ChangeUserData({
            variables: { ...values },
          });
        } catch {}
      }}
      validationSchema={ChangeUserDataSchema}
    >
      {({ touched, errors, isSubmitting, setFieldError }) => (
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
            <Grid item container={matches} xs={12} alignItems="flex-start">
              <SpinnerButton
                wrapperClassName={classes.wrapper}
                variant="contained"
                isLoading={isSubmitting}
                color="primary"
                type="submit"
              >
                Zapisz
              </SpinnerButton>
            </Grid>
          </Grid>
          <DataControl
            data={data}
            error={error}
            loading={loading}
            called={called}
            successMsg="Dane zaktualizowane pomyślnie."
            onError={(error, status, message) => {
              if (message === 'Email exists' && status === 409) {
                error.message = '';
                setFieldError('email', 'Email istnieje już w bazie danych.');
              }
              if (status === 401) logout();
            }}
            onSuccess={() => {
              if (data) setAuthInfo({ ...data.changeUserData });
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeUserData;
