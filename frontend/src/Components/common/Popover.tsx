import { Popover, List, ListItemButton, ListItem } from "@mui/material";
import { useTranslation } from 'react-i18next';
import RenameChannel from "../chatComponents/RenameChannel";
import { useState } from "react";
import DeleteChannel from "../chatComponents/DeleteChannel";

interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
  currentChannelPopoverChannel: Channel | null;
}

const PopoverMenu = ({ open, anchorEl, handleClosePopover, currentChannelPopoverChannel }: PopoverMenuProps) => {
  const { t } = useTranslation();
  const [openRenameChannel, setOpenRenameChannel] = useState(false);
  const [openDeleteChannel, setOpenDeleteChannel] = useState(false);

  const handleOpenRenameChannel = () => {
    setOpenRenameChannel(true);
  }

  const handleCloseRenameChannel = () => {
    setOpenRenameChannel(false);
  }

  const handleOpenDeleteChannel = () => {
    setOpenDeleteChannel(true);
  }

  const handleCloseDeleteChannel = () => {
    setOpenDeleteChannel(false);
  }


  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <List>
        <ListItem sx={{p: 0}}>
          <ListItemButton onClick={handleOpenRenameChannel}>
            {t('modalWindows.renameChannel.rename')}
          </ListItemButton>
        </ListItem>
        <ListItem sx={{p: 0}}>
          <ListItemButton onClick={handleOpenDeleteChannel}>
            {t('modalWindows.deleteChannel.delete')}
          </ListItemButton>
        </ListItem>
      </List>
      <RenameChannel open={openRenameChannel} handleClose ={() => handleCloseRenameChannel()} currentChannelPopoverChannel={currentChannelPopoverChannel}/>
      <DeleteChannel open={openDeleteChannel} handleClose ={() => handleCloseDeleteChannel()} currentChannelPopoverChannel={currentChannelPopoverChannel}/>
    </Popover>
  );
};

export default PopoverMenu;
