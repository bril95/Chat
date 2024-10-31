interface ChannelProps {
  open: boolean;
  handleClose: () => void;
}

interface SnackbarComponentProps {
  message: string;
  open: boolean;
  duration?: number;
  onClose: () => void;
}

export { type ChannelProps, type SnackbarComponentProps };
