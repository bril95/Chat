import { create } from 'zustand';
import { type Message } from './interface';

interface Store {
  allMessages: Message[];
  setMessages: (messages: Message[]) => void;
  setNewMessage: (newMessage: Message) => void;
}

const messageStore = create<Store>()((set, get) => ({
  allMessages: [],
  setMessages: (messages) => {
    set({ allMessages: messages });
  },
  setNewMessage: (newMessage) => {
    set({ allMessages: [...get().allMessages, newMessage] });
  },
}));

export default messageStore;
