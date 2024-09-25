import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import HeaderNavbar from '../HeaderNavbar';

const ChatMainPage = () => {
  return (
    <>
      <HeaderNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ height: '100vh' }}>
          <Grid size={{ xs: 6, md: 4 }} sx={{ borderRight: '1px solid red' }}>
            <>поле с каналами</>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <>поле с чатам</>
          </Grid>
        </Grid>
      </Box>
    </>
  )
};

export default ChatMainPage;