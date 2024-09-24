import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import routes from '../../api/routes';
import { signUpValidation } from '../../internalization/validation';
import HeaderNavbar from '../HeaderNavbar';

interface MyForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const { control, handleSubmit, reset, formState: { errors } } = useForm<MyForm>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpValidation(t)),
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
      <HeaderNavbar />
      <h1>{t('signUpPage.registration')}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
          <TextField
            {...field}
            label={t('signUpPage.username')}
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
          />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
          <TextField
            {...field}
            label={t('signUpPage.password')}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
          <TextField
            {...field}
            label={t('signUpPage.confirmPassword')}
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
          )}
        />
        <Button type="submit">{t('signUpPage.signUp')}</Button>
      </form>
    </>
  );
};

export default SignUpPage;