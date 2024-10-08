import { Grid2, Box, Typography, IconButton } from '@mui/material';
import HeaderNavbar from '../common/HeaderNavbar';
import Footer from '../common/Footer';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MessageForm from '../chatComponents/MessageForm';
import userStore from '../../store/userStore';
import ChannelsRender from '../chatComponents/ChannelsRender';
import AddChannel from '../chatComponents/AddChannel';
import { useState } from 'react';
import channelStore from "../../store/channelStore";
import { Navigate } from 'react-router-dom';
import routes from '../../routes';
import MessageRender from '../chatComponents/MessageRender';
import messageStore from '../../store/messageStore';

const ChatMainPage = () => {
  const { t } = useTranslation();
  const token = userStore((store) => store.token);

  const getCurrentChannel = channelStore((store) => store.currentChannel);
  const getAllMessages = messageStore((store) => store.allMessages);
  const currentChannelID = channelStore((store) => store.currentChannel.id);

  const [open, setOpen] = useState(false);
  const handleOpenAddChannel = () => {
    setOpen(true);
  };

  const handleCloseAddChannel = () => {
    setOpen(false);
  };

  if (!token) {
    return <Navigate to={routes.pages.loginPage()} replace />;
  }

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
            <IconButton sx={{m: 0, p: 0}} color='info' onClick={handleOpenAddChannel}><AddCircleOutlineIcon aria-hidden="false" sx={{p: 0}}/></IconButton>
            <AddChannel open={open} handleClose ={() => handleCloseAddChannel()}/>
          </Box>
          <ChannelsRender token={token} />
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
            <Typography variant="body1">{getCurrentChannel.name}</Typography>
            <Typography variant="body1">{t('chatMainPage.messages.key', { count: getAllMessages.filter((el) => el.channelId === currentChannelID).length })}</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-end',
            p: 1,
          }}>
          <MessageRender token={token}/>
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