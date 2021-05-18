import { FormikErrors, FormikTouched } from 'formik';
import * as H from 'history';

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
  images: string[];
}

export interface FieldsProps {
  touched: FormikTouched<Initial>;
  errors: FormikErrors<Initial>;
  variant?: 'standard' | 'filled' | 'outlined';
}

export type RouteTypeFunc = (
  pathname: string,
  initialValues: Initial,
  params: RouteParams,
  userInfo: { email: string; name: string; phonenumber: string },
  setInitialValues: React.Dispatch<React.SetStateAction<Initial>>,
  history: H.History<unknown>
) => void;