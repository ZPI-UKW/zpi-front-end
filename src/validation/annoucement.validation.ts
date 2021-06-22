/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';
import {
  emailValidation,
  numberValidation,
  phonenumberValidation,
  stringValidation,
} from './shared.validation';

export const AnnoucementActionSchema = Yup.object().shape({
  title: stringValidation.max(40, 'Maksymalnie ${max} znaków'),
  location: stringValidation,
  email: emailValidation,
  description: stringValidation.max(200, 'Maksymalnie ${max} znaków'),
  phonenumber: phonenumberValidation,
  costs: Yup.object().shape({
    day: numberValidation,
    week: numberValidation,
    month: numberValidation,
  }),
});
