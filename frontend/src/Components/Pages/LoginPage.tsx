import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, FormHelperText, Box, Link, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { userStore } from '../../store/userStore';
import routes from '../../api/routes';
import { loginValidation } from '../../internalization/validation';
import HeaderNavbar from '../HeaderNavbar';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface MyForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const setUserToken = userStore((state) => state.setToken);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<MyForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginValidation(t)),
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
      <HeaderNavbar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        p: 0,
        }}>
        <Typography variant="h3">{t('loginPage.enter')}</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor='username'>{t('loginPage.username')}</InputLabel>
                  <OutlinedInput
                    id='username'
                    {...field}
                    error={!!errors.username}
                    label={t('loginPage.username')}
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
                  <InputLabel htmlFor="password">{t('loginPage.password')}</InputLabel>
                  <OutlinedInput
                    id="password"
                    {...field}
                    error={!!errors.password}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={t('loginPage.password')}
                  />
                  {errors.password && (
                    <FormHelperText error>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Button sx={{ m: 1, p: 1, width: '100%', boxSizing: 'border-box'}} color="primary" variant="contained" type="submit">{t('loginPage.enter')}</Button>
        </form>
        <Typography>{t('loginPage.withoutAccount')}</Typography>
        <Link href={routes.pages.signUpPage()} underline="hover" sx={{m: 1}}>{t('loginPage.registration')}</Link>
      </Box>
    </>
  );
};

export default LoginPage;
