import { Button, Link, Toolbar, AppBar} from '@mui/material';
import routes from '../api/routes'

export default function HeaderNavbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button>
          <Link href={routes.pages.loginPage()} underline="none" color='#FFF' variant='h5' sx={{m: 1}}>Chat</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}