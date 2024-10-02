import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import userStore from '../../store/userStore';
import channelStore from '../../store/channelStore';

const MessageForm = () => {
  const { t } = useTranslation();

  const token = userStore((store) => store.token);
  const username = userStore((store) => store.username);
  const getCurrentChannel = channelStore((store) => store.currentChannel);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMessage = { body: formData.get('messageForm'), channelId: getCurrentChannel.id, username: username };
    axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    event.currentTarget.reset()
  };

  return (
    <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex' }}>
      <TextField
        fullWidth
        placeholder={t('chatMainPage.placeholderMessage')}
        id="messageForm"
        name='messageForm'
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{m: 0, p: 0}} color='info' type='submit' ><SendIcon /></IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
    </Box>
  );
};

export default MessageForm;
