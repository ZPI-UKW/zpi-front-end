import { FormikErrors, FormikTouched } from 'formik';

export interface RouteParams {
  addId: string;
}

export interface Initial {
  title: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  costs: {
    day: number;
    week: number;
    month: number;
  };
}

export interface FieldsProps {
  touched: FormikTouched<Initial>;
  errors: FormikErrors<Initial>;
  variant?: 'standard' | 'filled' | 'outlined';
}
