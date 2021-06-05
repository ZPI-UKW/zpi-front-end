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
  categoryId: string;
  costs: {
    day: number;
    week: number;
    month: number;
  };
  images: string[];
}

export interface CropperDialogProps {
  open: boolean;
  closeModal: () => void;
  currentImage: string | null;
  images: string[];
  setFieldValue: (field: string, value: any) => void;
  setErrors: (errors: FormikErrors<Initial>) => void;
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

export interface Place {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text?: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
}
