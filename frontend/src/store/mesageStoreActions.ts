import messageStore from './messageStore';
import { type MessageStore, type Message } from './interface';

export const useGetAllMessages = (): Message[] => {
  return messageStore((state: MessageStore) => state.allMessages);
};

export const useSetAllMessages = (): ((messages: Message[]) => void) => {
  return messageStore((state: MessageStore) => state.setMessages);
};

export const useSetNewMessage = (): ((newMessage: Message) => void) => {
  return messageStore((state: MessageStore) => state.setNewMessage);
};
