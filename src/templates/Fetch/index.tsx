import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useCategoryContextState } from '../../context/category/categoryContext';
import { GET_CATEGORIES } from '../../graphql/category';
import { FetchTemplateProps, QueryData } from './types';

const FetchTemplate = ({ children }: FetchTemplateProps) => {
  const { data, error } = useQuery<QueryData>(GET_CATEGORIES);
  const { setCategories } = useCategoryContextState();

  useEffect(() => {
    if (data !== undefined) {
      setCategories(data.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return <>{children}</>;
};

export default FetchTemplate;
