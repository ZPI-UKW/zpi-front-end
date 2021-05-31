import * as Yup from 'yup';
import {
  emailValidation,
  passwordValidation,
  phonenumberValidation,
  requiredMsg,
} from './shared.validation';

export const ChangeUserDataSchema = Yup.object().shape({
  email: emailValidation,
  name: Yup.string().required(requiredMsg),
  lastname: Yup.string().required(requiredMsg),
  phonenumber: phonenumberValidation,
});

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: passwordValidation,
  newPassword: passwordValidation.notOneOf(
    [Yup.ref('currentPassword'), null],
    'Nowe hasło musi być inne'
  ),
});
