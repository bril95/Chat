import axiosInstance from "../axiosInstance";

interface UserProfile {
  password: string,
  username: string,
};

export const loginUserResponse = async (data: UserProfile) => {
  try {
    const response = await axiosInstance.post('/login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signupUserResponse = async (data: UserProfile) => {
  try {
    const response = await axiosInstance.post('/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};