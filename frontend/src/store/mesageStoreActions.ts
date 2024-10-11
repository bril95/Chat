import messageStore from "./messageStore";

export const useGetAllMessages = () => {
  return messageStore((state) => state.allMessages);
};

export const useSetAllMessages = () => {
  return messageStore((state) => state.setMessages);
};

export const useSetNewMessage = () => {
  return messageStore((state) => state.setNewMessage);
};
