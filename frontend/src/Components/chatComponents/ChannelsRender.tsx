import { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, IconButton, ListItem, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PopoverMenu from '../common/Popover';
import RenameChannel from './RenameChannel';
import DeleteChannel from './DeleteChannel';
import { type Channel } from '../../store/interface';
import {
  useGetAllChannels,
  useSetCurrentChannel,
  useSetAllChannels,
  useSetCurrentChannelPopover,
  useGetCurrentChannel,
} from '../../store/channelStoreActions';
import { getChannelsResponse } from '../../services/api/channelApi';

const ChannelsRender = ({ token }: { token: string }) => {
  const setAllChannels = useSetAllChannels();
  const getAllChannels = useGetAllChannels();
  const setCurrentChannel = useSetCurrentChannel();
  const setCurrentChannelPopover = useSetCurrentChannelPopover();
  const getCurrentChannel = useGetCurrentChannel();

  const handleClickChannel = (el: Channel) => {
    setCurrentChannel(el);
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await getChannelsResponse();
        setAllChannels(response);
      } catch (error) {
        console.error(error);
      }
    };
    requestData();
  }, [token, setAllChannels]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, el: Channel) => {
    setAnchorEl(event.currentTarget);
    setCurrentChannelPopover(el);
  };

  const open = Boolean(anchorEl);

  const [openRenameChannel, setOpenRenameChannel] = useState(false);
  const [openDeleteChannel, setOpenDeleteChannel] = useState(false);

  const handleClosePopover = (action: string | null) => {
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
  };
  const handleCloseDeleteChannel = () => {
    setOpenDeleteChannel(false);
  };

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
                  pl: 1,
                  backgroundColor: getCurrentChannel.id === el.id ? 'gray' : 'inherit',
                  borderRadius: 3,
                }}
                onClick={() => {
                  handleClickChannel(el);
                }}
              >
                <ListItemText primary={el.name} />
              </ListItemButton>
              {!el.removable ? null : (
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
                      p: '4px',
                      m: 0,
                      backgroundColor: getCurrentChannel.id === el.id ? 'gray' : 'inherit',
                      borderRadius: 3,
                    }}
                    color="info"
                    onClick={(event) => {
                      handleOpenPopover(event, el);
                    }}
                  >
                    <ChevronRightIcon sx={{ p: 0 }} />
                  </IconButton>
                  <PopoverMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClosePopover={handleClosePopover}
                  />
                  <RenameChannel open={openRenameChannel} handleClose={handleCloseRenameChannel} />
                  <DeleteChannel open={openDeleteChannel} handleClose={handleCloseDeleteChannel} />
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default ChannelsRender;
