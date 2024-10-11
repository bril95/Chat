import { create } from 'zustand';
import { Channel } from './interface';

type Store = {
  allChannels: Channel[];
  currentChannel: Channel;
  currentChannelPopover: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setAllChannels: (channels: Channel[]) => void;
  setChannel: (channel: Channel) => void;
  setCurrentChannelPopover: (channel: Channel) => void;
};

const defaultChannel: Channel = { id: '', name: '', removable: true };

const channelStore = create<Store>((set, get) => ({
  allChannels: [],
  currentChannel: defaultChannel,
  currentChannelPopover: defaultChannel,
  setCurrentChannel: (currentChannel) => set({ currentChannel }),
  setAllChannels: (allChannels) => {
    set({ allChannels });
    if (allChannels.length > 0 && get().currentChannel.id === '') {
      set({
        currentChannel: allChannels[0],
      });
    }
  },
    setChannel: (channel) => set({ allChannels: [...get().allChannels, channel] }),
  setCurrentChannelPopover: (currentChannelPopover) => set({ currentChannelPopover }),
}));

export default channelStore;
