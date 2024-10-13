import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGetToken } from '../../store/userStoreActions';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ChannelProps } from '../../store/interface';
import { useGetAllChannels, useSetCurrentChannel, useSetAllChannels, useGetCurrentChannelPopover, useGetCurrentChannel } from "../../store/channelStoreActions";
import SnackbarComponent from '../common/Snackbar';

const socket = io();

export default function RenameChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = useGetToken();
  const currentChannelPopoverChannel = useGetCurrentChannelPopover();
  const getAllChannels = useGetAllChannels();
  const setAllChannels = useSetAllChannels();
  const currentChannel = useGetCurrentChannel();
  const setCurrentChannel = useSetCurrentChannel();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');

  const [channelName, setChannelName] = useState(currentChannelPopoverChannel.name);

  useEffect(() => {
    setChannelName(currentChannelPopoverChannel.name);
  }, [currentChannelPopoverChannel]);
  
  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      const allNewChannels = getAllChannels.map((el) => {
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
  },[getAllChannels, setAllChannels, setCurrentChannel, currentChannel])

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const editedChannel = formData.get('renameChannel');
        if(String(editedChannel).length === 0) {
          setCurrentError(t('modalWindows.addChannel.emptyChannel'));
          setShowSnackbar(true);
          throw Error;
        }
        const allChannelsName = getAllChannels.map((el) => el.name);
        if(allChannelsName.includes(String(editedChannel))) {
          setCurrentError(t('modalWindows.addChannel.sameNameChannel'))
          setShowSnackbar(true);
          throw Error;
        }
        const getEditedChannel = { name: editedChannel };
        axios.patch(`/api/v1/channels/${currentChannelPopoverChannel.id}`, getEditedChannel, {
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
    <SnackbarComponent
        message={currentError}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        />
  </Dialog>
  );
}