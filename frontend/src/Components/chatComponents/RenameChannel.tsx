import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import userStore from '../../store/userStore';

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

interface RenameChannelProps {
  open: boolean;
  handleClose: () => void;
  currentChannelPopoverChannel: Channel | null;
}

export default function RenameChannel({ open, handleClose, currentChannelPopoverChannel }: RenameChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);

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
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
      <Button type="submit">{t('modalWindows.submit')}</Button>
    </DialogActions>
  </Dialog>
  );
}