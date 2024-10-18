import axios from 'axios';
import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChannelProps } from '../../store/interface';
import { useGetToken } from '../../store/userStoreActions';
import SnackbarComponent from '../common/Snackbar';
import { useGetAllChannels, useSetCurrentChannel } from '../../store/channelStoreActions';
import { mainChatValidation, yupValidationError } from '../../internalization/validation';

export default function AddChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = useGetToken();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const getAllChannels = useGetAllChannels();
  const setCurrentChannel = useSetCurrentChannel();

  const openModal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newChannel = formData.get('channelName');
    const addNewChannel = { name: newChannel };
    const allChannelsName = getAllChannels.map((el) => el.name);
    const validationSchema = mainChatValidation(t, allChannelsName);

    try {
      await validationSchema.validate(addNewChannel)
      const resp = await axios.post('/api/v1/channels', addNewChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentChannel(resp.data);
      handleClose();
    } catch (error) {
      if (error instanceof yupValidationError) {
        setCurrentError(error.message);
        setShowSnackbar(true);
      } else {
        console.error(error);
      }
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
