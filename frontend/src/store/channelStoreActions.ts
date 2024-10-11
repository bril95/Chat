import channelStore from "./channelStore";

export const useGetAllChannels = () => {
  return channelStore((state) => state.allChannels);
};

export const useGetCurrentChannel = () => {
  return channelStore((state) => state.currentChannel);
};

export const useGetCurrentChannelPopover = () => {
  return channelStore((state) => state.currentChannelPopover);
};

export const useSetAllChannels = () => {
  return channelStore((state) => state.setAllChannels);
};

export const useSetChannel = () => {
  return channelStore((state) => state.setChannel);
};

export const useSetCurrentChannel = () => {
  return channelStore((state) => state.setCurrentChannel);
};

export const useSetCurrentChannelPopover = () => {
  return channelStore((state) => state.setCurrentChannelPopover);
};
