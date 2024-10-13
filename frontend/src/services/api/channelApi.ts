import axiosInstance from "../axiosInstance";

interface ChannelResponse {
  name: FormDataEntryValue | null;
};

export const getChannelsResponse = async () => {
  try {
    const response = await axiosInstance.get('/channels');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postChannelsResponse = async (channel: ChannelResponse) => {
  try {
    await axiosInstance.post('/channels', channel);
  } catch (error) {
    throw error;
  }
};

export const deleteChannelResponse = async (id: string) => {
  try {
    await axiosInstance.delete(`/channels/${id}`);
  } catch (error) {
    throw error;
  }
};

export const editedChannelResponse = async (id: string, channel: ChannelResponse) => {
  try {
    await axiosInstance.patch(`/channels/${id}`, channel);
  } catch (error) {
    throw error;
  }
}