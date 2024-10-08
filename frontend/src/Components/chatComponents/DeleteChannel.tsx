import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { io } from 'socket.io-client';
import axios from 'axios';
import userStore from '../../store/userStore';
import channelStore from '../../store/channelStore';
import messageStore from '../../store/messageStore';

interface RenameChannelProps {
  open: boolean;
  handleClose: () => void;
}

const socket = io();

export default function DeleteChannel({ open, handleClose }: RenameChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);
  const currentChannelPopoverChannel = channelStore((store) => store.currentChannelPopover);
  const allChannels = channelStore((store) => store.allChannels);
  const setAllChannels = channelStore((store) => store.setAllChannels);
  const setCurrentChannel = channelStore((store) => store.setCurrentChannel);
  const currentChanne = channelStore((store) => store.currentChannel);
  const allMessages = messageStore((store) => store.allMessages);
  const setAllMessage = messageStore((store) => store.setMessages);
  const defaultsChannel = channelStore((store) => store.defaultsChannel);

  const deleteChannel = () => {
    axios.delete(`/api/v1/channels/${currentChannelPopoverChannel?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (currentChannelPopoverChannel.id === currentChanne.id && defaultsChannel !== null) { // перенести проверку на null
      setCurrentChannel(defaultsChannel);
    }
    handleClose();
  }

  useEffect(() => {
    socket.on('removeChannel', (payload) => {
      const allNewChannels = allChannels.filter((channel) => channel.id !== payload.id);
      const allNewMessages = allMessages.filter((message) => message.channelId !==payload.id);
      setAllMessage(allNewMessages);
      setAllChannels(allNewChannels);
    });
  
    return () => {
      socket.off('removeChannel')
    };
  },[setAllChannels, allChannels, allMessages, setAllMessage])

  return (
    <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>{t('modalWindows.deleteChannel.deleteChannel')}</DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ color: 'black' }}>{t('modalWindows.deleteChannel.confirmation')}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
      <Button onClick={deleteChannel}>{t('modalWindows.deleteChannel.delete')}</Button>
    </DialogActions>
  </Dialog>
  );
}