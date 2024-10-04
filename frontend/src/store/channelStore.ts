import { create } from 'zustand'

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

type Store = {
  allChannels: Channel[];
  currentChannel: Channel;
  currentChannelPopover: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setChannels: (newChannels: Channel[]) => void;
  setCurrentChannelPopover: (channel: Channel) => void;
}

const channelStore = create<Store>()(
  (set) => ({
    allChannels: [],
    currentChannel: {} as Channel,
    currentChannelPopover: {} as Channel,
    setCurrentChannel: (currentChannel: Channel) => set({ currentChannel }),
    setChannels: (channels) => {
      set({ allChannels: channels });
      if (channels.length > 0) {
        set({ currentChannel: channels[0] });
      }
    },
    setCurrentChannelPopover: (currentChannelPopover: Channel) => set({ currentChannelPopover }),
  }
));

export default channelStore;
