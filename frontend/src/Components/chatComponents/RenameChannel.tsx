import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { ChannelProps } from '../../store/interface';
import { useGetAllChannels, useGetCurrentChannelPopover } from "../../store/channelStoreActions";
import SnackbarComponent from '../common/Snackbar';
import { mainChatValidation, yupValidationError } from '../../internalization/validation';
import { editedChannelResponse } from '../../services/api/channelApi';

export default function RenameChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const currentChannelPopover = useGetCurrentChannelPopover();
  const getAllChannels = useGetAllChannels();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const [channelName, setChannelName] = useState(currentChannelPopover.name);

  useEffect(() => {
    setChannelName(currentChannelPopover.name);
  }, [currentChannelPopover]);

  const handleEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const editedChannel = formData.get('renameChannel');
    const getEditedChannel = { name: editedChannel };
    const allChannelsName = getAllChannels.map((el) => el.name);
    const validationSchema = mainChatValidation(t, allChannelsName);

    try {
      await validationSchema.validate(getEditedChannel);
      await editedChannelResponse(currentChannelPopover.id, getEditedChannel)
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
      PaperProps={{
        component: 'form',
        onSubmit: handleEventSubmit,
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