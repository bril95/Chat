import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import channelStore from '../../store/channelStore';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { editedChannelResponse } from '../../services/api/channelApi';

interface RenameChannelProps {
  open: boolean;
  handleClose: () => void;
}

const socket = io();

export default function RenameChannel({ open, handleClose }: RenameChannelProps) {
  const { t } = useTranslation();
  const currentChannelPopoverChannel = channelStore((store) => store.currentChannelPopover)
  const [channelName, setChannelName] = useState(currentChannelPopoverChannel.name);
  const allChannels = channelStore((store) => store.allChannels);
  const setAllChannels = channelStore((store) => store.setAllChannels);
  const currentChannel = channelStore((store) => store.currentChannel);
  const setCurrentChannel = channelStore((store) => store.setCurrentChannel);

  useEffect(() => {
    setChannelName(currentChannelPopoverChannel.name);
  }, [currentChannelPopoverChannel]);
  
  useEffect(() => {
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
    return () => {
      socket.off('renameChannel')
    };
  },[allChannels, setAllChannels, setCurrentChannel, currentChannel])

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const editedChannel = { name: formData.get('renameChannel') };
        editedChannelResponse(currentChannelPopoverChannel.id, editedChannel)
        handleClose();
      },
    }}
  >
    <DialogTitle>{t('modalWindows.renameChannel.renameChannel')}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="renameChannel"
        type="text"
        variant="standard"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
      <Button type="submit">{t('modalWindows.submit')}</Button>
    </DialogActions>
  </Dialog>
  );
}