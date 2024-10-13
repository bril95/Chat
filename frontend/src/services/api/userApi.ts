import axiosInstance from "../axiosInstance";
import routes from "../routes";

interface UserProfile {
  password: string,
  username: string,
};

export const loginUserResponse = async (data: UserProfile) => {
  try {
    const response = await axiosInstance.post(routes.path.loginPath(), data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signupUserResponse = async (data: UserProfile) => {
  try {
    const response = await axiosInstance.post(routes.path.signUpPath(), data);
    return response.data;
  } catch (error) {
    throw error;
  }
};