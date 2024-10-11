import { Popover, List, ListItemButton, ListItem } from "@mui/material";
import { useTranslation } from 'react-i18next';

enum PopoverAction {
  Rename = 'openRename',
  Delete = 'openDelete'
}

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: (action: PopoverAction | null) => void;
}

const PopoverMenu = ({ open, anchorEl, handleClosePopover }: PopoverMenuProps) => {
  const { t } = useTranslation();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => handleClosePopover(null)}
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
        <ListItemButton onClick={() => handleClosePopover(PopoverAction.Rename)}>
            {t('modalWindows.renameChannel.rename')}
          </ListItemButton>
        </ListItem>
        <ListItem sx={{p: 0}}>
        <ListItemButton onClick={() => handleClosePopover(PopoverAction.Delete)}>
            {t('modalWindows.deleteChannel.delete')}
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export default PopoverMenu;