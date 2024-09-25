import Box from '@mui/material/Box';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { userStore } from '../../store/userStore';
import routes from '../../api/routes';
import { loginValidation } from '../../internalization/validation';
import HeaderNavbar from '../HeaderNavbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

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
        <h1>{t('loginPage.enter')}</h1>
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
                <>
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
                </>
              )}
            />
          </Box>
          <Button sx={{ m: 1, p: 1, width: '100%', boxSizing: 'border-box'}} color="primary" variant="contained" type="submit">{t('loginPage.enter')}</Button>
        </form>
        <span>{t('loginPage.withoutAccount')}</span>
        <a href={routes.pages.signUpPage()}>{t('loginPage.registration')}</a>
      </Box>
    </>
  );
};

export default LoginPage;
