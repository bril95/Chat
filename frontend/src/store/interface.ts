interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

interface ChannelProps {
  open: boolean;
  handleClose: () => void;
}

enum PopoverAction {
  Rename = 'openRename',
  Delete = 'openDelete',
}

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: (action: PopoverAction | null) => void;
}

interface MyFormLogin {
  username: string;
  password: string;
}

interface MyFormSignUp extends MyFormLogin {
  confirmPassword: string;
}

interface SnackbarComponentProps {
  message: string;
  open: boolean;
  duration?: number;
  onClose: () => void;
}

interface MainChatForm {
  name: string;
}

interface ChannelResponse {
  name: FormDataEntryValue | null;
}

interface MessageResponse {
  body: FormDataEntryValue | null;
  channelId: string;
  username: string;
}

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

export {
  type Channel,
  type Message,
  type ChannelProps,
  type PopoverMenuProps,
  type MyFormLogin,
  type SnackbarComponentProps,
  PopoverAction,
  type MyFormSignUp,
  type MainChatForm,
  type ChannelResponse,
  type MessageResponse,
  type UserStore,
  type MessageStore,
  type ChannelStore,
  type Language,
};
