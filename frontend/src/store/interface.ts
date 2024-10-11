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

interface ChannelProps {
  open: boolean;
  handleClose: () => void;
}

enum PopoverAction {
  Rename = 'openRename',
  Delete = 'openDelete'
}

interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: (action: PopoverAction | null) => void;
}

interface MyForm {
  username: string;
  password: string;
  confirmPassword?: string;
}

interface SnackbarComponentProps {
  message: string;
  open: boolean;
  duration?: number;
  onClose: () => void;
};

export { Channel, Message, ChannelProps, PopoverMenuProps, MyForm, SnackbarComponentProps, PopoverAction }