import { createContext, useContext, useState } from 'react';
import { Category, ICategoryContext } from './types';

const initialState: ICategoryContext = {
  categories: null,
  setCategories: (cat) => {},
};

const CategoryContext = createContext(initialState);
const { Provider } = CategoryContext;

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  const handleSetCategories = (cat: Category[]) => setCategories(cat);

  return (
    <Provider
      value={{
        categories,
        setCategories: handleSetCategories,
      }}
    >
      {children}
    </Provider>
  );
};

export const useCategoryContextState = () => useContext(CategoryContext);

export default CategoryProvider;
