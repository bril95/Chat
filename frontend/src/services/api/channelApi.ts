import axiosInstance from "../axiosInstance";

export const getChannelsResponse = async () => {
  try {
    const response = await axiosInstance.get('/channels');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postChannelsResponse = async (channel) => {
  try {
    await axiosInstance.post('/channels', channel);
  } catch (error) {
    throw error;
  }
};

export const deleteChannelResponse = async (id) => {
  try {
    await axiosInstance.delete(`/channels/${id}`);
  } catch (error) {
    throw error;
  }
};

export const editedChannelResponse = async (id, channel) => {
  try {
    await axiosInstance.patch(`/channels/${id}`, channel);
  } catch (error) {
    throw error;
  }
}