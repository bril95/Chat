import { FormGroup, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetLang, useSetLang } from '../../store/userStoreActions';

export default function Switcher() {
  const { i18n } = useTranslation();
  const currentLang = useGetLang();
  const setCurrnetLang = useSetLang();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLang = event.target.checked ? 'en' : 'ru';
    setCurrnetLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <FormGroup sx={{ ml: 3 }}>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: '12px', cursor: 'pointer' }}>
          Русский
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color="default"
              checked={currentLang === 'en'}
              onChange={handleLanguageChange}
            />
          }
          label={
            <Typography variant="body1" style={{ cursor: 'pointer' }}>
              English
            </Typography>
          }
        />
      </Box>
    </FormGroup>
  );
}
