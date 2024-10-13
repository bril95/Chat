import { io } from 'socket.io-client';
import channelStore from './store/channelStore';
import messageStore from './store/messageStore';

const socket = io();

const handleSocketEvents = () => {
  const { setChannel, setAllChannels, setCurrentChannel } = channelStore.getState();
  const { setNewMessage, setMessages } = messageStore.getState();

  socket.on('newChannel', (newChannel) => {
    setChannel(newChannel);
  });

  socket.on('removeChannel', (payload) => {
    const { allChannels } = channelStore.getState();
    const { allMessages } = messageStore.getState();
    const allNewChannels = allChannels.filter((channel) => channel.id !== payload.id);
    const allNewMessages = allMessages.filter((message) => message.channelId !== payload.id);
    setMessages(allNewMessages);
    setAllChannels(allNewChannels);
  });

  socket.on('renameChannel', (payload) => {
    const { currentChannel } = channelStore.getState();
    const { allChannels } = channelStore.getState();

    const allNewChannels = allChannels.map((el) => {
      if (el.id === payload.id) {
        return payload;
      }
      if (currentChannel.id === payload.id) {
        setCurrentChannel(payload);
      }
      return el;
    });

    setAllChannels(allNewChannels);
  });

  socket.on('newMessage', (payload) => {
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
