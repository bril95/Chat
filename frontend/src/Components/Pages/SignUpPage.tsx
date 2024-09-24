import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface MyForm {
  name: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<MyForm>({
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    }
  });

  const resetForm = () => {
    reset({
      name: '',
      password: '',
      confirmPassword: '',
    });
  };

  const submit: SubmitHandler<MyForm> = (data) => {
    console.log(data);
    resetForm();
  };

  return (
    <>
      <h1>{t('signUpPage.registration')}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
          <TextField {...field} label={t('signUpPage.username')} variant="outlined" />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
          <TextField {...field} label={t('signUpPage.password')} variant="outlined" />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
          <TextField {...field} label={t('signUpPage.confirmPassword')} variant="outlined" />
          )}
        />
        <Button type="submit">{t('signUpPage.signUp')}</Button>
      </form>
    </>
  );
};

export default SignUpPage;