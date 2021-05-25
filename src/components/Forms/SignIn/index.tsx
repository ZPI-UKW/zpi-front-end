import { Box, CircularProgress, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { forwardRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SigninSchema } from '../../../validation/AuthSchema';
import PasswordField from '../../CustomControls/password.control';
import { StyledButton, useStyles, StyledTextField } from '../styles';
import { LOGIN } from '../../../graphql/auth';
import { QueryData, QueryVars, SignInFormProps } from './types';
import DataControl from './signin.datacontrol';

const SigninForm = (
  { setContentType, closeModal }: SignInFormProps,
  ref: React.Ref<unknown> | undefined
) => {
  const classes = useStyles();
  const [LoginQuery, { error, data, loading }] = useLazyQuery<QueryData, QueryVars>(LOGIN);

  return (
    <Formik
      initialValues={{ email: '', loginPassword: '' }}
      onSubmit={({ email, loginPassword }) => {
        LoginQuery({ variables: { email, password: loginPassword } });
      }}
      validationSchema={SigninSchema}
    >
      {({ touched, errors }) => (
        <>
          <Form className={classes.form} ref={ref as React.Ref<HTMLFormElement>}>
            <Field
              label="Email"
              name="email"
              as={StyledTextField}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              name="loginPassword"
              as={PasswordField}
              error={touched.loginPassword && Boolean(errors.loginPassword)}
              helperText={touched.loginPassword && errors.loginPassword}
            />
            <div className={classes.buttonWrapper}>
              <StyledButton type="submit" color="primary" variant="contained" disabled={loading}>
                Zaloguj się
              </StyledButton>
              {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
            </div>
            <DataControl data={data} error={error} closeModal={closeModal} />
            <Box className={classes.box}>
              <Typography className={classes.message}>Nie masz konta?</Typography>
              <Link component="p" className={classes.link} onClick={() => setContentType('signup')}>
                Zarejestruj się
              </Link>
            </Box>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default forwardRef(SigninForm);
