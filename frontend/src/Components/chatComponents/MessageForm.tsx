import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useGetToken, useGetUsername } from '../../store/userStoreActions';
import { useGetCurrentChannel } from "../../store/channelStoreActions";
import { useState } from 'react';

const MessageForm = () => {
  const { t } = useTranslation();

  const token = useGetToken();
  const username = useGetUsername();
  const getCurrentChannelId = useGetCurrentChannel().id;
  const [message, setMessage] = useState('');

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMessage = { body: message, channelId: getCurrentChannelId, username: username };
    axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    setMessage('');
    event.currentTarget.reset()
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex' }}>
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
                <IconButton sx={{m: 0, p: 0}} color='info' type='submit' disabled={!message.trim()}><SendIcon sx={{p: 0}}/></IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
    </Box>
  );
};

export default MessageForm;
