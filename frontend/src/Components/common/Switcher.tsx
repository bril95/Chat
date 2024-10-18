import { FormGroup, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Switcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLang = event.target.checked ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <FormGroup sx={{ ml: 3 }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="body1"
          style={{ marginRight: '12px', cursor: 'pointer' }}
        >
          Русский
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color="default"
              onChange={handleLanguageChange}
            />
          }
          label={
            <Typography
              variant="body1"
              style={{ cursor: 'pointer' }}
            >
              English
            </Typography>
          }
        />
      </Box>
    </FormGroup>
  );
}
