import axiosInstance from '../axiosInstance';
import routes from '../routes';
import { type MyFormLogin } from '../../store/interface';

export const loginUserResponse = async (data: MyFormLogin): Promise<void> => {
  try {
    await axiosInstance.post(routes.path.loginPath(), data);
  } catch (error) {
    throw error;
  }
};

export const signupUserResponse = async (data: MyFormLogin): Promise<void> => {
  try {
    await axiosInstance.post(routes.path.signUpPath(), data);
  } catch (error) {
    throw error;
  }
};
