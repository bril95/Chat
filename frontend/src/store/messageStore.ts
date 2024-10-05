import { create } from 'zustand'

interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

type Store = {
  allMessages: Message[];
  setMessages: (messages: Message[]) => void;
  setNewMessage: (newMessage: Message) => void;
}

const messageStore = create<Store>()(
  (set, get) => ({
    allMessages: [],
    setMessages: (messages) => {
      set({ allMessages: messages });
    },
    setNewMessage: (newMessage) => {
      set({ allMessages: [...get().allMessages, newMessage] })
    }
  }
));

export default messageStore;
