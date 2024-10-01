import Button from '@mui/material/Button';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import userStore from '../../store/userStore';

interface AddChannelProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddChannel({ open, handleClose }: AddChannelProps) {
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
