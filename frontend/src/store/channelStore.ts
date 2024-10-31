import { create } from 'zustand';
import { type Channel, type ChannelStore } from './interface';

const emptyChannel: Channel = { id: '', name: '', removable: true };

const channelStore = create<ChannelStore>((set, get) => ({
  allChannels: [],
  currentChannel: emptyChannel,
  currentChannelPopover: emptyChannel,
  defaultChannel: emptyChannel,
  setCurrentChannel: (currentChannel) => {
    set({ currentChannel });
  },
  setAllChannels: (allChannels) => {
    set({ allChannels });
    if (allChannels.length > 0 && get().currentChannel.id === '') {
      set({
        defaultChannel: allChannels[0],
        currentChannel: allChannels[0],
      });
    }
  },
  setChannel: (channel) => {
    set({ allChannels: [...get().allChannels, channel] });
  },
  setCurrentChannelPopover: (currentChannelPopover) => {
    set({ currentChannelPopover });
  },
}));

export default channelStore;
