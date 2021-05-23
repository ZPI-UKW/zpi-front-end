import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { CustomApolloError, DataControlProps } from './types';

const DataControl = ({ data, error, handleSuccess, setContentType }: DataControlProps) => {
  const { setFieldError } = useFormikContext();

  useEffect(() => {
    try {
      if (data !== undefined && error === undefined) {
        handleSuccess(true);
        setTimeout(() => {
          handleSuccess(false);
          setContentType('signin');
        }, 750);
      } else if (error?.networkError) {
        const { networkError } = error as CustomApolloError;
        if (networkError?.result?.errors?.[0]?.message) {
          if (networkError.result.errors[0].message === 'user exists') {
            throw new Error('Podany adres email już istnieje w bazie.');
          }
          throw new Error('Wystąpił błąd podczas rejestracji.');
        }

        throw new Error('Wystąpił błąd podczas rejestracji.');
      }
    } catch (e) {
      setFieldError('email', e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  return null;
};

export default DataControl;
