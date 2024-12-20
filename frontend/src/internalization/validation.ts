import * as Yup from 'yup';
import {
  type SignUpForm,
  type LoginForm,
  type MainChatForm,
} from '../store/interfaces/FormInterface';

const signUpValidation = (t: (key: string) => string): Yup.ObjectSchema<SignUpForm> =>
  Yup.object({
    username: Yup.string()
      .required(t('schema.requiredField'))
      .min(3, t('schema.min3max20'))
      .max(20, t('schema.min3max20')),
    password: Yup.string().required(t('schema.requiredField')).min(6, t('schema.min6')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], t('schema.samePassword'))
      .required(t('schema.requiredField')),
  });

const loginValidation = (t: (key: string) => string): Yup.ObjectSchema<LoginForm> =>
  Yup.object({
    username: Yup.string().required(t('schema.requiredField')),
    password: Yup.string().required(t('schema.requiredField')),
  });

const mainChatValidation = (
  t: (key: string) => string,
  channelsName: string[]
): Yup.ObjectSchema<MainChatForm> =>
  Yup.object({
    name: Yup.string()
      .required(t('schema.requiredField'))
      .notOneOf(channelsName, t('schema.sameNameChannel'))
      .min(3, t('schema.min3max20'))
      .max(20, t('schema.min3max20')),
  });

const yupValidationError = Yup.ValidationError;

export { signUpValidation, loginValidation, mainChatValidation, yupValidationError };
