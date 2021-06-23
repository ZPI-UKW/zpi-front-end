import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useCategoryContextState } from '../../context/category/categoryContext';
import { GET_CATEGORIES } from '../../graphql/category';
import { FetchTemplateProps, QueryData } from './types';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';

const FetchTemplate = ({ children }: FetchTemplateProps) => {
  const { data, error } = useQuery<QueryData>(GET_CATEGORIES);
  const { categories, setCategories } = useCategoryContextState();
  const classes = useStyles();

  useEffect(() => {
    if (data !== undefined) {
      setCategories(data.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <>
      {categories ? (
        children
      ) : (
        <div className={classes.wrapper}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default FetchTemplate;
