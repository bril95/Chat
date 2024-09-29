import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, FormHelperText, Box, Link, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import userStore from '../../store/userStore';
import routes from '../../api/routes';
import { loginValidation } from '../../internalization/validation';
import HeaderNavbar from '../common/HeaderNavbar';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '../common/Footer';
import SnackbarComponent from '../common/Snackbar';

interface MyForm {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const setUserToken = userStore((store) => store.setToken);
  const setUser = userStore((store) => store.setUsername);
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

  const [showSnackbar, setShowSnackbar] = useState(false)

  const submit: SubmitHandler<MyForm> = async (data) => {
    try {
      const response = await axios.post('/api/v1/login', data);
      setUserToken(response.data.token);
      setUser(response.data.username);
      navigate(routes.pages.chatMainPage());
      resetForm();
    } catch (error) {
      console.error(error);
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
      }}>
        <HeaderNavbar />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          }}>
          <Typography variant="h3">{t('loginPage.enter')}</Typography>
          <Box component="form" onSubmit={handleSubmit(submit)} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '25ch',
            m: 1,
          }}>
            <Box>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ mb: 1, mt: 1 }} variant="outlined">
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
                  <FormControl sx={{ mb: 1, mt: 1 }} variant="outlined">
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
          </Box>
          <Typography>{t('loginPage.withoutAccount')}</Typography>
          <Link href={routes.pages.signUpPage()} underline="hover" sx={{m: 1}}>{t('loginPage.registration')}</Link>
        </Box>
        <Footer />
      </Box>
      <SnackbarComponent
        message={t('loginPage.error')}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
};

export default LoginPage;
