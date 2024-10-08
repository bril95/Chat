export default interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

export default interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}


export default interface ChannelProps {
  open: boolean;
  handleClose: () => void;
  channel: Channel;
}

export default interface PopoverMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClosePopover: () => void;
}