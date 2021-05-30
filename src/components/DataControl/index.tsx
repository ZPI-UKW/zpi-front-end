import { useEffect } from 'react';
import { DataControlProps } from '../../hooks/useGraphql/types';
import { useGraphql } from '../../hooks/useGraphql/useGraphql';

const DataControl = <T,>({ ...props }: DataControlProps<T>) => {
  useGraphql({ ...props });

  useEffect(() => {
    console.log('INSIDE');
  }, []);

  return null;
};

export default DataControl;
