import { io } from 'socket.io-client';
import channelStore from '../store/channelStore';

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}


const socket = io();
const setNewChannel = channelStore((store) => store.setChannels);

const handleSocketEvents = () => {

  const handleNewChannel = (channel: Channel) => {
    setNewChannel((prevChannels: Channel[]) => {
      const newArrChannels =[...prevChannels, channel];
      return setNewChannel(newArrChannels);
    });
  };

  socket.on('newChannel', handleNewChannel);
  return () => {
    socket.off('newChannel', handleNewChannel);
  };
}

export default handleSocketEvents;
