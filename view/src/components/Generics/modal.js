import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ScrollDialog(props) {
  const {open, onHide, title} = props

  return (
      <Dialog
        open={open}
        onClose={onHide}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>

            {props.children}

        </DialogContent>
        <DialogActions>
          <Button onClick={onHide} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
  )
}
