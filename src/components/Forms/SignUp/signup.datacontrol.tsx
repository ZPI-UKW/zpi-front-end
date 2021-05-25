import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { CustomApolloError, DataControlProps } from './types';
import { useSnackbar } from 'notistack';

const DataControl = ({ data, error, setContentType }: DataControlProps) => {
  const { setFieldError } = useFormikContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    try {
      if (data !== undefined && error === undefined) {
        enqueueSnackbar('Konto utworzone pomyślnie.', {
          variant: 'success',
          autoHideDuration: 2000,
        });
        setContentType('signin');
      } else if (error?.networkError) {
        const { networkError } = error as CustomApolloError;
        if (
          networkError?.result?.errors?.[0]?.message &&
          networkError.result.errors[0].message === 'user exists'
        ) {
          setFieldError('email', 'Podany adres email już istnieje w bazie.');
        }

        throw new Error();
      }
    } catch (e) {
      enqueueSnackbar('Podany adres email już istnieje w bazie.', { variant: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default DataControl;
