import { FormikErrors, FormikTouched } from 'formik';

export interface RouteParams {
  addId: string;
}

export interface QueryData {
  createAnnoucement: {
    _id: string;
  };
}

export interface QueryVars {
  id?: string;
  title: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  images: string[];
  day: number;
  week: number;
  month: number;
  category?: string;
}
export interface QueryVarsGetAnn {
  id: string;
}

export interface QueryDataGetAnn {
  getAnnoucement: {
    id: string;
    title: string;
    description: string;
    location: string;
    phone: string;
    email: string;
    costs: {
      day: number;
      week: number;
      month: number;
    };
    images: string[];
  };
}

export interface Initial {
  title: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  categoryId?: { id: string };
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

export interface AnnoucementControlProps {
  initialValues: Initial;
  setInitialValues: React.Dispatch<React.SetStateAction<Initial>>;
}
