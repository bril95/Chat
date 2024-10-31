import axiosInstance from '../axiosInstance';
import routes from '../routes';
import { type LoginForm } from '../../store/interfaces/FormInterface';

export const loginUserResponse = async (data: LoginForm): Promise<void> => {
  try {
    await axiosInstance.post(routes.path.loginPath(), data);
  } catch (error) {
    throw error;
  }
};

export const signupUserResponse = async (data: LoginForm): Promise<void> => {
  try {
    await axiosInstance.post(routes.path.signUpPath(), data);
  } catch (error) {
    throw error;
  }
};
