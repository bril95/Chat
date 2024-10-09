import { create } from 'zustand';
import { Channel } from './interface';

type Store = {
  allChannels: Channel[];
  currentChannel: Channel;
  currentChannelPopover: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setAllChannels: (channels: Channel[] | Channel) => void;
  setCurrentChannelPopover: (channel: Channel) => void;
};

const channelStore = create<Store>()(
  (set, get) => ({
    allChannels: [],
    currentChannel: { id: '', name: '', removable: true },
    currentChannelPopover: { id: '', name: '', removable: true },
    setCurrentChannel: (currentChannel) => set({ currentChannel }),
    setAllChannels: (channels) => {
      if (Array.isArray(channels)) {
        set({ allChannels: channels });
        if (get().currentChannel.id === '' && channels.length > 0) {
          set({ currentChannel: channels[0] });
        }
      } else {
        set({ allChannels: [...get().allChannels, channels] });
      }
    },
    setCurrentChannelPopover: (currentChannelPopover) => set({ currentChannelPopover }),
  })
);

export default channelStore;
