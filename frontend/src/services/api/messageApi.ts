import axiosInstance from '../axiosInstance';
import routes from '../routes';
import { type MessageResponse, type Message } from '../../store/interface';

export const getMessagesResponse = async (): Promise<Message[]> => {
  try {
    const response = await axiosInstance.get(routes.path.messagesPath());
    return response.data as Message[];
  } catch (error) {
    throw error;
  }
};

export const postMessagesResponse = async (message: MessageResponse): Promise<Message> => {
  try {
    const response = await axiosInstance.post(routes.path.messagesPath(), message);
    return response.data as Message;
  } catch (error) {
    throw error;
  }
};
