import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGetToken } from '../../store/userStoreActions';
import { useState, useEffect } from 'react';
import { ChannelProps } from '../../store/interface';
import {  useGetCurrentChannelPopover } from "../../store/channelStoreActions";

export default function RenameChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = useGetToken();
  const currentChannelPopoverChannel = useGetCurrentChannelPopover();

  const [channelName, setChannelName] = useState(currentChannelPopoverChannel.name);

  useEffect(() => {
    setChannelName(currentChannelPopoverChannel.name);
  }, [currentChannelPopoverChannel]);
  
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
        axios.patch(`/api/v1/channels/${currentChannelPopoverChannel.id}`, editedChannel, {
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