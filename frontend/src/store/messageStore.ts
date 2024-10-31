import { create } from 'zustand';
import { type MessageStore } from './interfaces/StoreInterface';

const messageStore = create<MessageStore>()((set, get) => ({
  allMessages: [],
  setMessages: (messages) => {
    set({ allMessages: messages });
  },
  setNewMessage: (newMessage) => {
    set({ allMessages: [...get().allMessages, newMessage] });
  },
}));

export default messageStore;
