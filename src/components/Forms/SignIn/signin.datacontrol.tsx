import { useEffect } from 'react';
import { useAuthContextState } from '../../../context/authContext';
import { DataControlProps } from './types';
import { useSnackbar } from 'notistack';
import { CustomApolloError } from '../../../types/global';

const DataControl = ({ data, error, closeModal }: DataControlProps) => {
  const { setAuthInfo } = useAuthContextState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    try {
      if (data !== undefined && error === undefined) {
        const { _id, email, lastname, name, phonenumber } = data.login;
        setAuthInfo({ _id, email, lastname, name, phonenumber });
        enqueueSnackbar('Zalogowano pomyślnie.', { variant: 'success', autoHideDuration: 2000 });
        closeModal();
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
