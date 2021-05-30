import * as Yup from 'yup';

export const requiredMsg = 'Pole wymagane';

export const emailValidation = Yup.string().email('Niepoprawny adres email').required(requiredMsg);
export const passwordValidation = Yup.string()
  .min(8, 'Hasło jest za krótkie, minimum 8 znaków')
  .required(requiredMsg);
export const phonenumberValidation = Yup.string()
  .transform((value) => value.replace(/[^\d]/g, ''))
  .length(9, 'Niepoprawny number telefonu')
  .required(requiredMsg);
