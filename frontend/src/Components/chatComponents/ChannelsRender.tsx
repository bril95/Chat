import axios from "axios";
import { useEffect, useState } from "react";
import { List, ListItemButton, ListItemText, IconButton, ListItem, Box } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PopoverMenu from "../common/Popover";
import { io } from 'socket.io-client';
import RenameChannel from "./RenameChannel";
import DeleteChannel from "./DeleteChannel";
import { Channel } from "../../store/interface";
import { useGetAllChannels, useSetCurrentChannel, useSetAllChannels, useSetChannel, useSetCurrentChannelPopover } from "../../store/channelStoreActions";

const socket = io();

const ChannelsRender = ({ token }: { token: string }) => {
  const setAllChannels = useSetAllChannels();
  const getAllChannels = useGetAllChannels();
  const setCurrentChannel = useSetCurrentChannel();
  const setCurrentChannelPopover = useSetCurrentChannelPopover();
  const setChannel = useSetChannel()

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

  const open = Boolean(anchorEl);

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      setChannel(newChannel)
    });

    return () => {
      socket.off('newChannel')
    };
  },[setChannel])

  const [openRenameChannel, setOpenRenameChannel] = useState(false);
  const [openDeleteChannel, setOpenDeleteChannel] = useState(false);

  const handleClosePopover = (action: String | null) => {
    if (action === 'openRename') {
      setOpenRenameChannel(true);
    }
    if (action === 'openDelete') {
      setOpenDeleteChannel(true);
    }
    setAnchorEl(null);
  };
  const handleCloseRenameChannel = () => {
    setOpenRenameChannel(false);
  }
  const handleCloseDeleteChannel = () => {
    setOpenDeleteChannel(false);
  }

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
            <RenameChannel open={openRenameChannel} handleClose ={handleCloseRenameChannel}/>
            <DeleteChannel open={openDeleteChannel} handleClose ={handleCloseDeleteChannel} />
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