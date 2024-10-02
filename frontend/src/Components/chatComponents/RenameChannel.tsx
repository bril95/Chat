import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface RenameChannelProps {
  open: boolean;
  handleClose: () => void;
}

export default function RenameChannel({ open, handleClose }: RenameChannelProps) {
  const { t } = useTranslation();

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('renameChannel'))
        handleClose();
      },
    }}
  >
    <DialogTitle>{t('modalWindows.renameChannel.renameChannel')}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        name="renameChannel"
        type="text"
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>{t('modalWindows.cancel')}</Button>
      <Button type="submit">{t('modalWindows.submit')}</Button>
    </DialogActions>
  </Dialog>
  );
}