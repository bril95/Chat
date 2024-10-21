import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarComponentProps } from '../../store/interface';

export default function SnackbarComponent({
  message,
  open,
  duration = 4000,
  onClose,
}: SnackbarComponentProps) {
  const [openSnackbar, setOpenSnackbar] = useState(open);

  useEffect(() => {
    setOpenSnackbar(open);
  }, [open]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={duration}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="warning"
        variant="filled"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
