import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button, Box, FormControl, InputLabel, OutlinedInput, FormHelperText, Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        p: 0,
        }}>
        <Typography variant='h3'>{t('signUpPage.registration')}</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor='username'>{t('signUpPage.username')}</InputLabel>
              <OutlinedInput
                id='username'
                {...field}
                error={!!errors.username}
                label={t('signUpPage.username')}
              />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="password">{t('signUpPage.password')}</InputLabel>
            <OutlinedInput
              id="password"
              {...field}
              error={!!errors.password}
              label={t('signUpPage.password')}
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          )}
          />
        <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              {...field}
              error={!!errors.confirmPassword}
              label={t('loginPage.password')}
            />
            {errors.confirmPassword && (
              <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>
            )}
          </FormControl>
          )}
          />
          </Box>
          <Button sx={{ m: 1, p: 1, width: '100%', boxSizing: 'border-box'}} color="primary" variant="contained" type="submit">{t('signUpPage.signUp')}</Button>
        </form>
      </Box>
    </>
  );
};

export default SignUpPage;
