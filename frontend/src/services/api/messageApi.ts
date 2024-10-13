import axiosInstance from "../axiosInstance";

interface Message {
  body: FormDataEntryValue | null;
  channelId: string;
  username: string;
};

export const getMessagesResponse = async () => {
  try {
    const response = await axiosInstance.get('/messages');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMessagesResponse = async (message: Message) => {
  try {
    const response = await axiosInstance.post('/messages', message);
    return response.data;
  } catch (error) {
    throw error;
  }
};