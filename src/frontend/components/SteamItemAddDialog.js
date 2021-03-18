import React, { useCallback, useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default ({ title, open, onClose, onSubmit }) => {
  const inputRef = useRef()

  const handleFormSubmit = useCallback((ev) => {
    ev.preventDefault()
    const { value } = inputRef.current
    if (value) onSubmit(value)
  }, [onSubmit])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            name="steamID64"
            label="SteamID64"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
