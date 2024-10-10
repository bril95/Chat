import axiosInstance from "../axiosInstance";

export const loginUserResponse = async (data) => {
  try {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUserResponse = async (data) => {
  try {
    const response = await axiosInstance.post('/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};