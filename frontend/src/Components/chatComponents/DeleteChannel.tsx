import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
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

export default function DeleteChannel({ open, handleClose,currentChannelPopoverChannel }: RenameChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);

  const deleteChannel = () => {
    axios.delete(`/api/v1/channels/${currentChannelPopoverChannel?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    handleClose();
  }

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