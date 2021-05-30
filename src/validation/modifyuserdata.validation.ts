import * as Yup from 'yup';
import { emailValidation, phonenumberValidation, requiredMsg } from './shared.validation';

export const ChangeUserDataSchema = Yup.object().shape({
  email: emailValidation,
  name: Yup.string().required(requiredMsg),
  lastname: Yup.string().required(requiredMsg),
  phonenumber: phonenumberValidation,
});
