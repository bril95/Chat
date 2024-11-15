import { IconButton, Toolbar, Typography, AppBar, Box } from '@mui/material';
import { Telegram, LinkedIn } from '@mui/icons-material';
import Switcher from './Switcher';

export default function Footer(): JSX.Element {
  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Switcher />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Toolbar>
          <Typography
            sx={{
              mr: '20px',
              fontSize: { xs: '0.75rem', sm: '1rem' },
            }}
          >
            Bril Vadim
          </Typography>
          <IconButton
            sx={{
              m: 0,
              p: 0,
              fontSize: { xs: '1rem', sm: '1.5rem' },
            }}
            color="info"
            href={'https://t.me/just_brill'}
          >
            <Telegram
              sx={{
                p: { xs: '5px', sm: '5px' },
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              m: 0,
              p: 0,
              fontSize: { xs: '1rem', sm: '1.5rem' },
            }}
            color="info"
            href={'https://www.linkedin.com/in/vadim-bril/'}
          >
            <LinkedIn
              sx={{
                p: { xs: '5px', sm: '5px' },
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            />
          </IconButton>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
