interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

enum PopoverAction {
  Rename = 'openRename',
  Delete = 'openDelete',
}

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: (action: PopoverAction | null) => void;
}

export { type Channel, type Message, type PopoverMenuProps, PopoverAction };
