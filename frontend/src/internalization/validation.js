import * as Yup from 'yup';

const signUpValidation = (t) => Yup.object({
  username: Yup.string()
    .required(t('schema.requiredField'))
    .min(3, t('schema.min3max20'))
    .max(20, t('schema.min3max20')),
  password: Yup.string()
    .required(t('schema.requiredField'))
    .min(6, t('schema.min6')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], t('schema.samePassword'))
    .required(t('schema.requiredField')),
});

const loginValidation = (t) => Yup.object({
  username: Yup.string().required(t('schema.requiredField')),
  password: Yup.string().required(t('schema.requiredField')),
});

const mainChatValidation = (t, channelsName) => Yup.object({
  channelName: Yup.string()
    .required(t('schema.requiredField'))
    .notOneOf(channelsName, t('schema.sameNameChannel'))
    .min(3, t('schema.min3max20'))
    .max(20, t('schema.min3max20')),
});

export { signUpValidation, loginValidation, mainChatValidation };