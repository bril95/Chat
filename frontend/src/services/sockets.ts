import { io } from 'socket.io-client';
import channelStore from '../store/channelStore';
import messageStore from '../store/messageStore';
import { type Channel, type Message } from '../store/interfaces/ChatInterface';

const socket = io();

const removeItemsById = <T>(items: T[], field: keyof T, value: string): T[] =>
  items.filter((item) => item[field] !== value);

const handleSocketEvents = (): (() => void) => {
  const { setChannel, setAllChannels, setCurrentChannel } = channelStore.getState();
  const { setNewMessage, setMessages } = messageStore.getState();

  socket.on('newChannel', (newChannel: Channel) => {
    setChannel(newChannel);
  });

  socket.on('removeChannel', (payload: Channel) => {
    const { allChannels } = channelStore.getState();
    const { allMessages } = messageStore.getState();
    const allNewChannels = removeItemsById(allChannels, 'id', payload.id);
    const allNewMessages = removeItemsById(allMessages, 'channelId', payload.id);
    setMessages(allNewMessages);
    setAllChannels(allNewChannels);
  });

  socket.on('renameChannel', (payload: Channel) => {
    const { currentChannel, allChannels } = channelStore.getState();

    if (currentChannel.id === payload.id) {
      setCurrentChannel(payload);
    }

    const allNewChannels = allChannels.map((el) => (el.id === payload.id ? payload : el));
    setAllChannels(allNewChannels);
  });

  socket.on('newMessage', (payload: Message) => {
    setNewMessage(payload);
  });

  return () => {
    socket.off('newChannel');
    socket.off('removeChannel');
    socket.off('renameChannel');
    socket.off('newMessage');
  };
};

export default handleSocketEvents;
