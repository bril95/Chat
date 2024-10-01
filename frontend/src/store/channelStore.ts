import { create } from 'zustand'

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

type Store = {
  allChannels: Channel[];
  currentChannel: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setChannels: (newChannels: Channel[]) => void;
}

const channelStore = create<Store>()(
  (set) => ({
    allChannels: [],
    currentChannel: {} as Channel,
    setCurrentChannel: (currentChannel: Channel) => set({ currentChannel }),
    setChannels: (channels) => {
      set({ allChannels: channels });
      if (channels.length > 0) {
        set({ currentChannel: channels[0] });
      }
    },
  }
));

export default channelStore;
