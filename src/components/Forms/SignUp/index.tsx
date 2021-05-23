import { Box, CircularProgress, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { forwardRef, useState } from 'react';
import { SignupSchema } from '../../../validation/AuthSchema';
import { SignUpFormProps, QueryData, QueryVars } from './types';
import { StyledButton, useStyles, StyledTextField } from '../styles';
import PasswordField from '../passwordField';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../graphql/auth';
import DataControl from './signup.datacontrol';

const SignupForm = ({ setContentType }: SignUpFormProps, ref: React.Ref<unknown> | undefined) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [CreateUser, { data, error, loading }] = useMutation<QueryData, QueryVars>(REGISTER);

  const handleSuccess = (flag: boolean) => setSuccess(flag);

  return (
    <Formik
      initialValues={{
        email: 'seba1@wp.pl',
        password: '123123123',
        name: 'Sebaa',
        lastname: 'ZZaaa',
        phonenumber: '555222777',
      }}
      onSubmit={async (values) => {
        try {
          await CreateUser({ variables: values });
        } catch {}
      }}
      validationSchema={SignupSchema}
    >
      {({ touched, errors }) => (
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
          <Field
            label="Numer telefonu"
            name="phonenumber"
            type="tel"
            as={StyledTextField}
            error={touched.phonenumber && Boolean(errors.phonenumber)}
            helperText={touched.phonenumber && errors.phonenumber}
          />
          <div className={classes.buttonWrapper}>
            <StyledButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              className={success ? classes.buttonSuccess : undefined}
            >
              Zarejestruj się
            </StyledButton>
            {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
          </div>

          <Box className={classes.box}>
            <Typography className={classes.message}>Masz już konto?</Typography>
            <Link component="p" className={classes.link} onClick={() => setContentType('signin')}>
              Zaloguj się
            </Link>
          </Box>
          <DataControl
            data={data}
            error={error}
            handleSuccess={handleSuccess}
            setContentType={setContentType}
          />
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(SignupForm);
