import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type ChannelProps } from '../../store/interfaces/PropsInterface';
import SnackbarComponent from '../common/Snackbar';
import { useGetAllChannels, useSetCurrentChannel } from '../../store/channelStoreActions';
import { mainChatValidation, yupValidationError } from '../../internalization/validation';
import { postChannelsResponse } from '../../services/api/channelApi';

export default function AddChannel({ open, handleClose }: ChannelProps): JSX.Element {
  const { t } = useTranslation();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const getAllChannels = useGetAllChannels();
  const setCurrentChannel = useSetCurrentChannel();

  const openModal = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newChannel = formData.get('channelName');
    const addNewChannel = { name: newChannel };
    const allChannelsName = getAllChannels.map((el) => el.name);
    const validationSchema = mainChatValidation(t, allChannelsName);

    try {
      await validationSchema.validate(addNewChannel);
      const response = await postChannelsResponse(addNewChannel);
      setCurrentChannel(response);
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
    <Dialog open={open} onClose={handleClose}>
      <form
        onSubmit={(event) => {
          void openModal(event);
        }}
      >
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
        onClose={() => {
          setShowSnackbar(false);
        }}
      />
    </Dialog>
  );
}
