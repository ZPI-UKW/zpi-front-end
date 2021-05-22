import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useAuthContextState } from '../../../context/authContext';
import { CustomApolloError, DataControlProps } from './types';

const DataControl = ({ data, error, closeModal }: DataControlProps) => {
  const { setAuthInfo } = useAuthContextState();
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
      setTimeout(() => closeModal(), 500);
    } else if (error !== undefined && error?.networkError) {
      const { networkError } = error as CustomApolloError;
      if (networkError?.result?.errors) setFieldError('email', 'Nieprawidłowe dane logowania.');
      else setFieldError('email', 'Wystąpił błąd podczas logowania.');
    } else setFieldError('email', 'Wystąpił błąd podczas logowania.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default DataControl;
