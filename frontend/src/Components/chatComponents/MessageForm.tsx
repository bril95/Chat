import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';

const MessageForm = () => {
  const { t } = useTranslation();

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newChannel = formData.get('messageForm');
    console.log(newChannel);
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
