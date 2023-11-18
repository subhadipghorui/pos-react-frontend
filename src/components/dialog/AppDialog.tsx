import { Dialog, DialogTitle, IconButton, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../../store/rootStore';
import { observer } from 'mobx-react-lite';

const AppDialog = () => {
  const { rootStore: { dialogStore } } = useStore();

  const { isDialogOpen, closeDialog, confirmAction } = dialogStore

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isDialogOpen}
      onClose={() => closeDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Alert"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => closeDialog()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => confirmAction()} style={{ backgroundColor: '#25a325eb', color: 'white' }} variant="contained">Confirm</Button>
        <Button style={{ backgroundColor: '#e63535f0', color: 'white' }} variant="contained" onClick={() => closeDialog()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default observer(AppDialog)