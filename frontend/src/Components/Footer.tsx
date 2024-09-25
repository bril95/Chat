import { IconButton, Toolbar, Typography, AppBar } from '@mui/material';
import { Telegram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <AppBar position="static" component="footer" 
    sx={{
      display: 'flex',
      alignItems: 'flex-end',
    }}>
      <Toolbar>
        <Typography sx={{mr: '20px'}}>Bril Vadim</Typography>
        <IconButton sx={{m: 0, p: 0}} color='info' href={'https://t.me/just_brill'}><Telegram /></IconButton>
        <IconButton sx={{m: 0, p: 0}} color='info' href={'https://www.linkedin.com/in/vadim-bril/'}><LinkedIn /></IconButton>
      </Toolbar>
    </AppBar>
  );
}
