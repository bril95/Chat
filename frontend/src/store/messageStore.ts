import { create } from 'zustand'

interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

type Store = {
  allMessages: Message[];
  setMessages: (newMessages: Message[]) => void;
}

const messageStore = create<Store>()(
  (set) => ({
    allMessages: [],
    setMessages: (messages) => {
      set({ allMessages: messages });
    },
  }
));

export default messageStore;
