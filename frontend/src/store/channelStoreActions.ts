import channelStore from './channelStore';
import { type ChannelStore, type Channel } from './interface';

export const useGetAllChannels = (): Channel[] => {
  return channelStore((state: ChannelStore) => state.allChannels);
};

export const useGetCurrentChannel = (): Channel => {
  return channelStore((state: ChannelStore) => state.currentChannel);
};

export const useGetCurrentChannelPopover = (): Channel => {
  return channelStore((state: ChannelStore) => state.currentChannelPopover);
};

export const useGetDefaultChannel = (): Channel => {
  return channelStore((state: ChannelStore) => state.defaultChannel);
};

export const useSetAllChannels = (): ((channels: Channel[]) => void) => {
  return channelStore((state: ChannelStore) => state.setAllChannels);
};

export const useSetChannel = (): ((channel: Channel) => void) => {
  return channelStore((state: ChannelStore) => state.setChannel);
};

export const useSetCurrentChannel = (): ((channel: Channel) => void) => {
  return channelStore((state: ChannelStore) => state.setCurrentChannel);
};

export const useSetCurrentChannelPopover = (): ((channel: Channel) => void) => {
  return channelStore((state: ChannelStore) => state.setCurrentChannelPopover);
};
