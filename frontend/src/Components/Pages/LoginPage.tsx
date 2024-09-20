import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface MyForm {
  name: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<MyForm>({
    defaultValues: {
      name: '',
      password: '',
    }
  });

  const resetForm = () => {
    reset({
      name: '',
      password: '',
    });
  };

  const submit: SubmitHandler<MyForm> = (data) => {
    console.log(data);
    resetForm();
  };

  return (
    <>
      <h1>{t('loginPage.enter')}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
          <TextField {...field} label={t('loginPage.username')} variant="outlined" />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
          <TextField {...field} label={t('loginPage.password')} variant="outlined" />
          )}
        />
        <Button type="submit">Отправить</Button>
      </form>
      <span>{t('loginPage.withoutAccount')}</span>
      <span> </span>
      <a href="/signup">{t('loginPage.registration')}</a>
    </>
  );
};

export default LoginPage;
