import { Box, TextField, IconButton, InputAdornment} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';

const MessageForm = () => {
  const { t } = useTranslation();

  return (
    <>
    <Box sx={{}}>
      <TextField fullWidth placeholder={t('chatMainPage.placeholderMessage')} id="messageForm" 
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{m: 0, p: 0}} color='info' href={''}><SendIcon /></IconButton>
            </InputAdornment>
          ),
        }
      }}/>
    </Box>
    </>
  )
};

export default MessageForm;