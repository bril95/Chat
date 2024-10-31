import axiosInstance from '../axiosInstance';
import routes from '../routes';
import { type ChannelResponse } from '../../store/interfaces/ResponseInterface';
import { type Channel } from '../../store/interfaces/ChatInterface';

export const getChannelsResponse = async (): Promise<Channel[]> => {
  try {
    const response = await axiosInstance.get(routes.path.channelsPath());
    return response.data as Channel[];
  } catch (error) {
    throw error;
  }
};

export const postChannelsResponse = async (channel: ChannelResponse): Promise<Channel> => {
  try {
    const response = await axiosInstance.post(routes.path.channelsPath(), channel);
    return response.data as Channel;
  } catch (error) {
    throw error;
  }
};

export const deleteChannelResponse = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(routes.path.channelIdPath(id));
  } catch (error) {
    throw error;
  }
};

export const editedChannelResponse = async (
  id: string,
  channel: ChannelResponse
): Promise<void> => {
  try {
    await axiosInstance.patch(routes.path.channelIdPath(id), channel);
  } catch (error) {
    throw error;
  }
};
