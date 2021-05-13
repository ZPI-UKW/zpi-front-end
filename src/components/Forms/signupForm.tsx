import { Box, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { forwardRef } from 'react';
import { SignupSchema } from '../../validation/AuthSchema';
import { SetContentType } from '../AuthDialog/types';
import { StyledButton, useStyles, StyledTextField } from './styles';
import PasswordField from './passwordField';

const SignupForm = (
  { setContentType }: { setContentType: SetContentType },
  ref: React.Ref<unknown> | undefined
) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', lastname: '', phonenumber: '' }}
      onSubmit={(values) => {
        console.log(values);
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
          <StyledButton type="submit" color="primary" variant="contained">
            Zarejestruj się
          </StyledButton>
          <Box className={classes.box}>
            <Typography className={classes.message}>Masz już konto?</Typography>
            <Link component="p" className={classes.link} onClick={() => setContentType('signin')}>
              Zaloguj się
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(SignupForm);
