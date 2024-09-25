import { Button, Link, Toolbar} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import routes from '../api/routes'

export default function HeaderNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button>
            <Link href={routes.pages.loginPage()} underline="none" color='#FFF' variant='h5' sx={{m: 1}}>Chat</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}