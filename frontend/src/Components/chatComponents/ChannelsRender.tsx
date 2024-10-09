import axios from "axios";
import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemText, IconButton, ListItem, Box } from "@mui/material";
import channelStore from "../../store/channelStore";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PopoverMenu from "../common/Popover";
import { io } from 'socket.io-client';
import { Channel } from "../../store/interface";

const socket = io();

const ChannelsRender = ({ token }: { token: string }) => {
  const setAllChannels = channelStore((store) => store.setAllChannels);
  const getAllChannels = channelStore((store) => store.allChannels);
  const setCurrentChannel = channelStore((store) => store.setCurrentChannel);
  const setCurrentChannelPopover = channelStore((store) => store.setCurrentChannelPopover)

  const handleClickChannel = (el: Channel) => {
    setCurrentChannel(el);
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllChannels(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    requestData();

  }, [token, setAllChannels]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, el: Channel) => {
    setAnchorEl(event.currentTarget);
    setCurrentChannelPopover(el)
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      setAllChannels(newChannel)
    });
  
    return () => {
      socket.off('newChannel')
    };
  },[setAllChannels])

  return (
    <>
      {getAllChannels.length > 0 && (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            position: 'relative',
            overflow: 'auto',
            maxHeight: '100%',
            '& ul': { padding: 0 },
          }}
        >
          {getAllChannels.map((el) => (
            <ListItem key={el.id}>
            <ListItemButton
              sx={{
                m: 0,
                p: 0,
              }}
              onClick={() => handleClickChannel(el)}
            >
              <ListItemText primary={el.name} />
            </ListItemButton>
            {el.removable === false ? null :
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              m: 0,
              p: 0,
              justifyContent: 'right',
              width: 'auto',
            }}
          >
            <IconButton
              sx={{
                m: 0,
                p: 0,
              }}
              color="info"
              onClick={(event) => handleOpenPopover(event, el)}
            >
              <ChevronRightIcon sx={{ p: 0 }} />
            </IconButton>
            <PopoverMenu
              open={open}
              anchorEl={anchorEl}
              handleClosePopover={handleClosePopover}
            />
          </Box>
            }
          </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ChannelsRender;
