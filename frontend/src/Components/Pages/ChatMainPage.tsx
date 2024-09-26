import { Grid2, Box, Typography, IconButton } from '@mui/material';
import HeaderNavbar from '../HeaderNavbar';
import Footer from '../Footer';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MessageForm from '../MessageForm';

const ChatMainPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }}>
      <HeaderNavbar />
      <Grid2 container spacing={0} sx={{ flexGrow: 1 }}>
        <Grid2 size={{ xs: 4, md: 2 }} sx={{ p: 2, backgroundColor: 'lightgray', }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="h5">{t('chatMainPage.channels')}</Typography>
            <IconButton sx={{m: 0, p: 0}} color='info' href={''}><AddCircleOutlineIcon /></IconButton>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 10 }} 
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}>
            <Typography variant="body1">Текущий канал</Typography>
            <Typography variant="body1">Кол-во сообщений</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-end',
            p: 1,
          }}>
            <Typography variant="body1">Сообщение1</Typography>
            <Typography variant="body1">Сообщение2</Typography>
            <Typography variant="body1">Сообщение3</Typography>
            <Typography variant="body1">Сообщение4</Typography>
            <Typography variant="body1">Сообщение5</Typography>
          </Box>
          <MessageForm />
        </Grid2>
      </Grid2>
      <Footer />
    </Box>
    </>
  )
};

export default ChatMainPage;