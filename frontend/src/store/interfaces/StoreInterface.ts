import { type Message, type Channel } from './ChatInterface';

type Language = 'ru' | 'en';

interface UserStore {
  username: string;
  token: string;
  currentLang: Language;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  setCurrentLang: (lang: Language) => void;
}

interface MessageStore {
  allMessages: Message[];
  setMessages: (messages: Message[]) => void;
  setNewMessage: (newMessage: Message) => void;
}

interface ChannelStore {
  allChannels: Channel[];
  currentChannel: Channel;
  currentChannelPopover: Channel;
  defaultChannel: Channel;
  setCurrentChannel: (channel: Channel) => void;
  setAllChannels: (channels: Channel[]) => void;
  setChannel: (channel: Channel) => void;
  setCurrentChannelPopover: (channel: Channel) => void;
}

export { type UserStore, type MessageStore, type ChannelStore, type Language };
