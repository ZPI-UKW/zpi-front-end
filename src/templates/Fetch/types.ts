import { Category } from '../../context/category/types';

export interface QueryData {
  category: Category[];
}

export interface FetchTemplateProps {
  children: React.ReactNode;
}
