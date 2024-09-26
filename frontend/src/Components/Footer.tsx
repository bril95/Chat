import { IconButton, Toolbar, Typography, AppBar } from '@mui/material';
import { Telegram, LinkedIn } from '@mui/icons-material';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect'

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
        {/* <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ color: 'info.main' }}>
        Lang
        </InputLabel>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: 'Lang',
            id: 'uncontrolled-native',
          }}
          sx={{ color: 'info.main' }}
        >
          <option value={2}>Eng</option>
          <option value={1}>Rus</option>
        </NativeSelect>
      </FormControl> */}
      </Toolbar>
    </AppBar>
  );
}
