import axiosInstance from "../axiosInstance";

export const getMessagesResponse = async () => {
  try {
    const response = await axiosInstance.get('/messages');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMessagesResponse = async (message) => {
  try {
    const response = await axiosInstance.post('/messages', message);
    return response.data;
  } catch (error) {
    throw error;
  }
};