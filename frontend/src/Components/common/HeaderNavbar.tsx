import { Button, Link, Toolbar, AppBar} from '@mui/material';
import { useTranslation } from 'react-i18next';
import routes from '../../routes'

export default function HeaderNavbar() {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Button>
          <Link href={routes.pages.loginPage()} underline="none" color='#FFF' variant='h5' sx={{m: 1}}>{t('headers.chat')}</Link>
        </Button>
        <Button>
          <Link href={routes.pages.loginPage()} underline="none" color='#FFF' variant='h5' sx={{m: 1}}>{t('headers.exit')}</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}