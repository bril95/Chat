import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import routes from '../../api/routes';

interface MyForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const { control, handleSubmit, reset } = useForm<MyForm>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    }
  });

  const resetForm = () => {
    reset({
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  const submit: SubmitHandler<MyForm> = async (data) => {
    try{
      await axios.post('/api/v1/signup', data);
      navigate(routes.pages.chatMainPage());
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{t('signUpPage.registration')}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="username"
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