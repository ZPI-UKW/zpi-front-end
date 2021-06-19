import { Box, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { forwardRef } from 'react';
import { SignupSchema } from '../../../validation/AuthSchema';
import { SignUpFormProps, QueryData, QueryVars } from './types';
import { useStyles, StyledTextField } from '../styles';
import PasswordField from '../../CustomControls/password.control';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../graphql/auth';
import MaskedInput from '../../CustomControls/masked.control';
import DataControl from '../../DataControl';
import SpinnerButton from '../../SpinnerButton';

const SignupForm = ({ setContentType }: SignUpFormProps, ref: React.Ref<unknown> | undefined) => {
  const classes = useStyles();
  const [CreateUser, { data, error, loading, called }] =
    useMutation<QueryData, QueryVars>(REGISTER);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        name: '',
        lastname: '',
        phonenumber: '',
      }}
      onSubmit={async (values) => {
        try {
          await CreateUser({
            variables: { ...values, phonenumber: values.phonenumber.replace(/[^\d]/g, '') },
          });
        } catch {}
      }}
      validationSchema={SignupSchema}
    >
      {({ touched, errors, isSubmitting, setFieldError, resetForm }) => (
        <Form className={classes.form} ref={ref as React.Ref<HTMLFormElement>}>
          <Field
            label="Email"
            name="email"
            as={StyledTextField}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Field
            name="password"
            as={PasswordField}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Field
            label="Imię"
            name="name"
            as={StyledTextField}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <Field
            label="Nazwisko"
            name="lastname"
            as={StyledTextField}
            error={touched.lastname && Boolean(errors.lastname)}
            helperText={touched.lastname && errors.lastname}
          />
          <MaskedInput type="tel" name="phonenumber" label="Numer telefonu" />
          <SpinnerButton
            wrapperClassName={classes.buttonWrapper}
            className={classes.button}
            variant="contained"
            isLoading={isSubmitting}
            color="primary"
            type="submit"
          >
            Zarejestruj się
          </SpinnerButton>
          <Box className={classes.box}>
            <Typography className={classes.message}>Masz już konto?</Typography>
            <Link component="p" className={classes.link} onClick={() => setContentType('signin')}>
              Zaloguj się
            </Link>
          </Box>
          <DataControl
            data={data}
            error={error}
            loading={loading}
            called={called}
            successMsg="Zarejestrowano pomyślnie."
            messages={{ _401: 'Błędny email lub hasło.' }}
            onError={(error, __, message) => {
              if (message === 'user exists') {
                error.message = '';
                setFieldError('email', 'Email already exists');
              }
            }}
            onSuccess={() => {
              setContentType('signin');
              resetForm();
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(SignupForm);
