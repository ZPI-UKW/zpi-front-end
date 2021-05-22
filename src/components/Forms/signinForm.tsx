import { Box, Link, Typography } from '@material-ui/core';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { ApolloError, ServerError, ServerParseError, useLazyQuery } from '@apollo/client';
import { forwardRef, useEffect } from 'react';
import { SigninSchema } from '../../validation/AuthSchema';
import { SetContentType } from '../AuthDialog/types';
import PasswordField from './passwordField';
import { StyledButton, useStyles, StyledTextField } from './styles';
import { LOGIN } from '../../graphql/auth';
import { useAuthContextState } from '../../context/authContext';

interface QueryData {
  login: {
    userId?: string;
    email?: string;
    lastname?: string;
    name?: string;
    phonenumber?: string;
  };
}

interface QueryVars {
  email: string;
  password: string;
}

interface CustomApolloError extends Omit<ApolloError, 'networkError'> {
  networkError?: (Error | ServerParseError | ServerError | null) & {
    result?: { errors?: { message?: string; status?: number | string }[] };
    data: any;
  };
}

const DataControl = ({
  data,
  error,
}: {
  data: QueryData | undefined;
  error: ApolloError | undefined;
}) => {
  const { setAuthInfo, userInfo } = useAuthContextState();
  const { setFieldError } = useFormikContext();

  useEffect(() => {
    console.log(data);
    if (
      data !== undefined &&
      data?.login?.userId &&
      data?.login?.email &&
      data?.login?.lastname &&
      data?.login?.name &&
      data?.login?.phonenumber
    ) {
      console.log(123);
      const { userId, email, lastname, name, phonenumber } = data.login;
      setAuthInfo({ _id: userId, email, lastname, name, phonenumber });
    } else if (error !== undefined && error?.networkError) {
      const { networkError } = error as CustomApolloError;
      if (networkError?.result?.errors) setFieldError('email', 'Nieprawidłowe dane logowania.');
      else setFieldError('email', 'Wystąpił błąd podczas logowania.');
    } else setFieldError('email', 'Wystąpił błąd podczas logowania.');
  }, [error, data]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return null;
};

const SigninForm = (
  { setContentType }: { setContentType: SetContentType },
  ref: React.Ref<unknown> | undefined
) => {
  const classes = useStyles();
  const [LoginQuery, { error, data }] = useLazyQuery<QueryData, QueryVars>(LOGIN, {
    fetchPolicy: 'no-cache',
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        LoginQuery({ variables: values });
      }}
      validationSchema={SigninSchema}
    >
      {({ touched, errors }) => (
        <>
          <Form className={classes.form} ref={ref as React.Ref<HTMLFormElement>}>
            {data?.login?.userId}
            {console.log(data)}
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
            <DataControl data={data} error={error} />
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
