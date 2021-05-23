import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useAuthContextState } from '../../../context/authContext';
import { CustomApolloError, DataControlProps } from './types';

const DataControl = ({ data, error, closeModal, handleSuccess }: DataControlProps) => {
  const { setAuthInfo } = useAuthContextState();
  const { setFieldError } = useFormikContext();

  useEffect(() => {
    if (
      data !== undefined &&
      data?.login?.userId &&
      data?.login?.email &&
      data?.login?.lastname &&
      data?.login?.name &&
      data?.login?.phonenumber
    ) {
      const { userId, email, lastname, name, phonenumber } = data.login;
      setAuthInfo({ _id: userId, email, lastname, name, phonenumber });
      handleSuccess();
      setTimeout(() => closeModal(), 750);
    } else if (error !== undefined && error?.networkError) {
      const { networkError } = error as CustomApolloError;
      if (networkError?.result?.errors) setFieldError('email', 'Nieprawidłowe dane logowania.');
      if (networkError?.result?.errors) setFieldError('password', 'Nieprawidłowe dane logowania.');
      else setFieldError('email', 'Wystąpił błąd podczas logowania.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default DataControl;
