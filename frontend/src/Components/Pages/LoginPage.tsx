import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { userStore } from '../../store/userStore';
import routes from '../../api/routes';

interface MyForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const setUserToken = userStore((state) => state.setToken);
  const { control, handleSubmit, reset } = useForm<MyForm>({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const resetForm = () => {
    reset({
      username: '',
      password: '',
    });
  };

  const submit: SubmitHandler<MyForm> = async (data) => {
    try {
      const response = await axios.post('/api/v1/login', data);
      setUserToken(response.data.token);
      navigate(routes.pages.chatMainPage());
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{t('loginPage.enter')}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="username"
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
        <Button type="submit">{t('loginPage.enter')}</Button>
      </form>
      <span>{t('loginPage.withoutAccount')}</span>
      <span> </span>
      <a href={routes.pages.signUpPage()}>{t('loginPage.registration')}</a>
    </>
  );
};

export default LoginPage;
