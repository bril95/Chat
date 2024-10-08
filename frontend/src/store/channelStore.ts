import { create } from 'zustand';
import Channel from './interface';

type Store = {
  allChannels: Channel[];
  currentChannel: Channel;
  currentChannelPopover: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setAllChannels: (allChannels: Channel[]) => void;
  setNewChannel: (newChannel: Channel) => void;
  setCurrentChannelPopover: (channel: Channel) => void;
}

const channelStore = create<Store>()(
  (set, get) => ({
    allChannels: [],
    currentChannel: {} as Channel,
    currentChannelPopover: {} as Channel,
    setCurrentChannel: (currentChannel) => set({ currentChannel }),
    setAllChannels: (allChannels) => {
      set({ allChannels });
      if (get().allChannels.length > 0 && Object.keys(get().currentChannel).length === 0) {
        set({ currentChannel: get().allChannels[0] });
      }},
    setNewChannel: (newChannel) => set({ allChannels: [...get().allChannels, newChannel] }),
    setCurrentChannelPopover: (currentChannelPopover) => set({ currentChannelPopover }),
  }
));

export default channelStore;
