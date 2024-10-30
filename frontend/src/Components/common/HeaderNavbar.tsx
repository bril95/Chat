import { Button, Link, Toolbar, AppBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../../services/routes';

export default function HeaderNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToMain = () => {
    sessionStorage.clear();
    navigate(routes.pages.loginPage());
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography color="#FFF" variant="h5" sx={{ m: 1 }}>
          {t('headers.chat')}
        </Typography>
        <Button>
          <Link onClick={handleBackToMain} underline="none" color="#FFF" variant="h5" sx={{ m: 1 }}>
            {t('headers.exit')}
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
