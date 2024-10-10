import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import userStore from '../../store/userStore';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ChannelProps } from '../../store/interface';
import { useGetAllChannels, useSetCurrentChannel, useSetAllChannels, useGetCurrentChannelPopover, useGetCurrentChannel } from "../../store/channelStoreActions";

const socket = io();

export default function RenameChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);
  const currentChannelPopoverChannel = useGetCurrentChannelPopover();
  const allChannels = useGetAllChannels();
  const setAllChannels = useSetAllChannels();
  const currentChannel = useGetCurrentChannel();
  const setCurrentChannel = useSetCurrentChannel();

  const [channelName, setChannelName] = useState(currentChannelPopoverChannel.name);

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
        axios.patch(`/api/v1/channels/${currentChannelPopoverChannel?.id}`, editedChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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