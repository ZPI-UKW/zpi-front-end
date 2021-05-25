import * as Yup from 'yup';

const requiredMsg = 'Pole wymagane';

const emailValidation = Yup.string().email('Niepoprawny adres email').required(requiredMsg);
const passwordValidation = Yup.string()
  .min(8, 'Hasło jest za krótkie, minimum 8 znaków')
  .required(requiredMsg);

export const SigninSchema = Yup.object().shape({
  email: emailValidation,
  loginPassword: passwordValidation,
});

export const SignupSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  name: Yup.string().required(requiredMsg),
  lastname: Yup.string().required(requiredMsg),
  phonenumber: Yup.string().length(9, 'Niepoprawny number telefonu').required(requiredMsg),
});
