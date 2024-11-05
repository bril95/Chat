import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import { useGetUsername } from '../../store/userStoreActions';
import { useGetCurrentChannel } from '../../store/channelStoreActions';
import { useState } from 'react';
import { postMessagesResponse } from '../../services/api/messageApi';

const MessageForm = (): JSX.Element => {
  const { t } = useTranslation();

  const username = useGetUsername();
  const getCurrentChannelId = useGetCurrentChannel().id;
  const [message, setMessage] = useState('');

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const newMessage = {
      body: message,
      channelId: getCurrentChannelId,
      username,
    };
    try {
      await postMessagesResponse(newMessage);
      setMessage('');
      if (event.currentTarget !== null) {
        event.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        void sendMessage(event);
      }}
      sx={{ display: 'flex' }}
    >
      <TextField
        fullWidth
        placeholder={t('chatMainPage.placeholderMessage')}
        id="messageForm"
        name="messageForm"
        value={message}
        onChange={handleInputChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ m: 0, p: 0 }}
                  color="info"
                  type="submit"
                  disabled={message.trim() === ''}
                >
                  <SendIcon sx={{ p: 0 }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default MessageForm;
