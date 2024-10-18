import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGetToken } from '../../store/userStoreActions';
import { useState, useEffect } from 'react';
import { ChannelProps } from '../../store/interface';
import { useGetAllChannels, useGetCurrentChannelPopover } from "../../store/channelStoreActions";
import SnackbarComponent from '../common/Snackbar';
import { mainChatValidation, yupValidationError } from '../../internalization/validation';

export default function RenameChannel({ open, handleClose }: ChannelProps) {
  const { t } = useTranslation();
  const token = useGetToken();
  const currentChannelPopoverChannel = useGetCurrentChannelPopover();
  const getAllChannels = useGetAllChannels();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const [channelName, setChannelName] = useState(currentChannelPopoverChannel.name);

  useEffect(() => {
    setChannelName(currentChannelPopoverChannel.name);
  }, [currentChannelPopoverChannel]);

  const handleEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const editedChannel = formData.get('renameChannel');
    const getEditedChannel = { name: editedChannel };
    const allChannelsName = getAllChannels.map((el) => el.name);
    const validationSchema = mainChatValidation(t, allChannelsName);

    try {
      await validationSchema.validate(getEditedChannel)
      await axios.patch(`/api/v1/channels/${currentChannelPopoverChannel.id}`, getEditedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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