import { FormGroup, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetLang, useSetLang } from '../../store/userStoreActions';

export default function Switcher(): JSX.Element {
  const { i18n, t } = useTranslation();
  const currentLang = useGetLang();
  const setCurrnetLang = useSetLang();

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const newLang = event.target.checked ? 'en' : 'ru';
    setCurrnetLang(newLang);
    await i18n.changeLanguage(newLang);
  };

  return (
    <FormGroup sx={{ ml: 3 }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="body1"
          style={{ marginRight: '12px', cursor: 'pointer' }}
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
          }}
        >
          {t('footer.langRu')}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color="default"
              checked={currentLang === 'en'}
              onChange={(event) => {
                void handleLanguageChange(event);
              }}
            />
          }
          label={
            <Typography
              variant="body1"
              style={{ cursor: 'pointer' }}
              sx={{
                fontSize: { xs: '0.75rem', sm: '1rem' },
              }}
            >
              {t('footer.langEn')}
            </Typography>
          }
        />
      </Box>
    </FormGroup>
  );
}
