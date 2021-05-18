import { Box, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { forwardRef } from 'react';
import { SigninSchema } from '../../validation/AuthSchema';
import { SetContentType } from '../AuthDialog/types';
import PasswordField from './passwordField';
import { StyledButton, useStyles, StyledTextField } from './styles';

const SigninForm = (
  { setContentType }: { setContentType: SetContentType },
  ref: React.Ref<unknown> | undefined
) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={SigninSchema}
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
          <StyledButton type="submit" color="primary" variant="contained">
            Zaloguj się
          </StyledButton>
          <Box className={classes.box}>
            <Typography className={classes.message}>Nie masz konta?</Typography>
            <Link component="p" className={classes.link} onClick={() => setContentType('signup')}>
              Zarejestruj się
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default forwardRef(SigninForm);
