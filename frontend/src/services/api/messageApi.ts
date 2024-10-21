import axiosInstance from '../axiosInstance';
import routes from '../routes';

interface Message {
  body: FormDataEntryValue | null;
  channelId: string;
  username: string;
}

export const getMessagesResponse = async () => {
  try {
    const response = await axiosInstance.get(routes.path.messagesPath());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMessagesResponse = async (message: Message) => {
  try {
    const response = await axiosInstance.post(
      routes.path.messagesPath(),
      message
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
