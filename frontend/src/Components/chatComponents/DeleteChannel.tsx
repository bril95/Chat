import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import userStore from '../../store/userStore';
import channelStore from '../../store/channelStore';

interface RenameChannelProps {
  open: boolean;
  handleClose: () => void; 
}

export default function DeleteChannel({ open, handleClose }: RenameChannelProps) {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);
  const currentChannelPopoverChannel = channelStore((store) => store.currentChannelPopover)

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