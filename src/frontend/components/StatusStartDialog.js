import React, { useCallback, useRef } from 'react'
import { useConnection } from 'hooks'
import { SERVER_START_EVENT } from 'constants/events'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default ({ open, onClose, worlds, options }) => {
  const conn = useConnection()
  const nameRef = useRef()
  const worldRef = useRef()
  const passwordRef = useRef()
  const publicRef = useRef()

  const handleConfirmClick = useCallback(() => {
    conn.emit(SERVER_START_EVENT, {
      Name: nameRef.current.value,
      World: worldRef.current.value,
      Password: passwordRef.current.value,
      Public: publicRef.current.checked,
    })
    onClose()
  }, [conn, onClose])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        Server options
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          name="serverName"
          label="Server name"
          inputRef={nameRef}
          defaultValue={options.Name || ''}
        />
        <Autocomplete
          fullWidth
          freeSolo
          disableClearable
          options={worlds.map((world) => world.Name)}
          style={{ display: 'inline-flex' }}
          defaultValue={options.World || ''}
          key={options.World || ''} // supress warning about defaultValue change
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              margin="dense"
              name="serverWorld"
              label="World name"
              inputRef={worldRef}
            />
          )}
        />
        <TextField
          fullWidth
          margin="dense"
          name="serverPassword"
          label="Password"
          inputRef={passwordRef}
          defaultValue={options.Password || ''}
        />
        <FormControlLabel
          label="Public"
          control={(
            <Checkbox
              color="default"
              name="serverPublic"
              inputRef={publicRef}
              defaultChecked={!!options.Public}
              key={!!options.Public} // supress warning about defaultValue change
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirmClick}>
          Start server
        </Button>
      </DialogActions>
    </Dialog>
  )
}
