import axiosInstance from '../axiosInstance';
import routes from '../routes';

interface ChannelResponse {
  name: FormDataEntryValue | null;
}

export const getChannelsResponse = async () => {
  try {
    const response = await axiosInstance.get(routes.path.channelsPath());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postChannelsResponse = async (channel: ChannelResponse) => {
  try {
    const response = await axiosInstance.post(routes.path.channelsPath(), channel);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChannelResponse = async (id: string) => {
  try {
    await axiosInstance.delete(routes.path.channelIdPath(id));
  } catch (error) {
    throw error;
  }
};

export const editedChannelResponse = async (id: string, channel: ChannelResponse) => {
  try {
    await axiosInstance.patch(routes.path.channelIdPath(id), channel);
  } catch (error) {
    throw error;
  }
};
