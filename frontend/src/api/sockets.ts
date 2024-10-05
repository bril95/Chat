import { io } from 'socket.io-client';
import channelStore from '../store/channelStore';

const socket = io();

const setNewChannel = channelStore((store) => store.setNewChannel);
const setAllChannels = channelStore((store) => store.setAllChannels);
const allChannels = channelStore((store) => store.allChannels);

const handleSocketEvents = () => {
  socket.on('newChannel', (newChannel) => {
    setNewChannel(newChannel)
  });

  socket.on('removeChannel', (payload) => {
    const allNewChannels = allChannels.filter((channel) => channel.id !== payload.id);
    setAllChannels(allNewChannels);
  });

  return () => {
    socket.off('newChannel')
    socket.off('removeChannel')
  };
}

export default handleSocketEvents;
