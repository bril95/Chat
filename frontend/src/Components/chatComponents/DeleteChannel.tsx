import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type ChannelProps } from '../../store/interface';
import {
  useGetCurrentChannelPopover,
  useSetCurrentChannel,
  useGetCurrentChannel,
  useGetDefaultChannel,
} from '../../store/channelStoreActions';
import { deleteChannelResponse } from '../../services/api/channelApi';

export default function DeleteChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const setCurrentChannel = useSetCurrentChannel();
  const currentChanneId = useGetCurrentChannel().id;
  const currentChannelPopoverId = useGetCurrentChannelPopover().id;
  const defaultChannel = useGetDefaultChannel();

  const deleteChannel = async () => {
    try {
      await deleteChannelResponse(currentChannelPopoverId);
      if (currentChannelPopoverId === currentChanneId) {
        setCurrentChannel(defaultChannel);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('modalWindows.deleteChannel.deleteChannel')}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'black' }}>
          {t('modalWindows.deleteChannel.confirmation')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
        <Button onClick={deleteChannel}>{t('modalWindows.deleteChannel.delete')}</Button>
      </DialogActions>
    </Dialog>
  );
}
