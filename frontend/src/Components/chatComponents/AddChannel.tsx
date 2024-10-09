import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import userStore from '../../store/userStore';
import { ChannelProps } from '../../store/interface';

export default function AddChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);

  const openModal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newChannel = formData.get('channelName');
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
      </Dialog>
  );
}
