import { useEffect } from 'react';
import { useAuthContextState } from '../../../context/authContext';
import { CustomApolloError, DataControlProps } from './types';
import { useSnackbar } from 'notistack';

const DataControl = ({ data, error, closeModal }: DataControlProps) => {
  const { setAuthInfo } = useAuthContextState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    try {
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
        enqueueSnackbar('Zalogowano pomyślnie.', { variant: 'success' });
        setTimeout(() => closeModal(), 1000);
      } else if (error !== undefined && error?.networkError) {
        const { networkError } = error as CustomApolloError;
        if (networkError?.result?.errors)
          enqueueSnackbar('Nieprawidłowe dane logowania.', { variant: 'error' });
        else throw new Error();
      }
    } catch {
      enqueueSnackbar('Wystąpił błąd podczas logowania.', { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default DataControl;
