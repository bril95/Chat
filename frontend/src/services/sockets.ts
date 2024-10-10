import { io } from 'socket.io-client';
import channelStore from '../store/channelStore';
import messageStore from '../store/messageStore';

const socket = io();

const setNewChannel = channelStore((store) => store.setNewChannel);
const setAllChannels = channelStore((store) => store.setAllChannels);
const allChannels = channelStore((store) => store.allChannels);
const currentChannel = channelStore((store) => store.currentChannel);
const setCurrentChannel = channelStore((store) => store.setCurrentChannel);
const setNewMessage = messageStore((store) => store.setNewMessage);

const handleSocketEvents = () => {
  socket.on('newChannel', (newChannel) => {
    setNewChannel(newChannel)
  });

  socket.on('removeChannel', (payload) => {
    const allNewChannels = allChannels.filter((channel) => channel.id !== payload.id);
    setAllChannels(allNewChannels);
  });

  socket.on('renameChannel', (payload) => {
    const allNewChannels = allChannels.map((el) => {
      if (el.id === payload.id) {
        el = payload;
      }
      if(currentChannel.id === payload.id) {
        setCurrentChannel(payload);
      }
      return el;
    })
    setAllChannels(allNewChannels)
  });

  socket.on('newMessage', (payload) => {
    setNewMessage(payload)
  });

  return () => {
    socket.off('newChannel');
    socket.off('removeChannel');
    socket.off('renameChannel');
    socket.off('newMessage')
  };
}

export default handleSocketEvents;
