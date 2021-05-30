import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { CustomApolloError } from '../../types/global';
import { DataControlProps } from './types';

const initialMessages = {
  _401: 'Brak autoryzacji.',
  _403: 'Dostęp do zasobu zabroniony.',
  _404: 'Nie znaleziono zasobu.',
  _409: 'Zasób już instnieje.',
  _422: 'Niepoprawna wartość pól.',
  _500: 'Wewnętrzny błąd serwera.',
};

export const useGraphql = <T,>({
  data,
  error,
  loading,
  called,
  messages,
  successMsg,
  onError,
  onSuccess,
}: DataControlProps<T>) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isOk, setIsOk] = useState(false);
  const [errorMessages, setErrorMessages] = useState(initialMessages);

  useEffect(() => {
    setErrorMessages({ ...errorMessages, ...messages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!called || loading) return;

    try {
      if (data !== undefined && error === undefined) {
        enqueueSnackbar(successMsg || 'Akcja wykonana pomyslnie.', {
          variant: 'success',
          autoHideDuration: 1500,
        });
        setIsOk(true);
        if (typeof onSuccess === 'function') onSuccess();
        return;
      } else if (error !== undefined && error?.networkError) {
        const err = new Error();
        const { networkError } = error as CustomApolloError;

        if (networkError?.result?.errors?.[0]?.status) {
          const status = networkError.result.errors[0].status;
          const resMessage = networkError.result.errors[0].message;
          const msg = `_${status}` as const;

          err.message = errorMessages[msg];

          if (typeof onError === 'function') onError(err, status, resMessage || 'Wystąpił błąd');
          setIsOk(false);
          throw err;
        }
      } else {
        setIsOk(false);
        throw new Error('Wystąpił nieznany błąd.');
      }
    } catch (e) {
      if (e.message !== '')
        enqueueSnackbar(e.message || 'Wystąpił nieznany błąd.', {
          variant: 'error',
          autoHideDuration: 1500,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return isOk;
};
