import axios from 'axios';
import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChannelProps } from '../../store/interface';
import { useGetToken } from '../../store/userStoreActions';
import SnackbarComponent from '../common/Snackbar';
import { useGetAllChannels } from '../../store/channelStoreActions';

export default function AddChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = useGetToken();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const getAllChannels = useGetAllChannels();

  const openModal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newChannel = formData.get('channelName');
    if(String(newChannel).length === 0) {
      setCurrentError(t('modalWindows.addChannel.emptyChannel'));
      setShowSnackbar(true);
      throw Error;
    }
    const allChannelsName = getAllChannels.map((el) => el.name);
    if(allChannelsName.includes(String(newChannel))) {
      setCurrentError(t('modalWindows.addChannel.sameNameChannel'))
      setShowSnackbar(true);
      throw Error;
    }
    const addNewChannel = { name: newChannel };

    try {
     await axios.post('/api/v1/channels', addNewChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={openModal}>
          <DialogTitle>{t('modalWindows.addChannel.addChannel')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="channelName"
              name="channelName"
              label={t('modalWindows.addChannel.channelName')}
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
            <Button type="submit">{t('modalWindows.submit')}</Button>
          </DialogActions>
        </form>
        <SnackbarComponent
        message={currentError}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        />
      </Dialog>
  );
}
