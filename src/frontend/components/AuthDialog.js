import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useConnection, useConnectionEvent, useSessionStorage } from 'hooks'
import { ERROR_EVENT, AUTH_EVENT } from 'constants/events'
import { AUTH_ERROR_TYPE } from 'constants/errorTypes'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default () => {
  const inputRef = useRef()
  const conn = useConnection()
  const { get, set } = useSessionStorage('auth')
  const [password, setPassword] = useState(get)
  const [dialogOpen, setDialogOpen] = useState(!password)

  const handleFormSubmit = useCallback((ev) => {
    ev.preventDefault()
    const { value } = inputRef.current
    setPassword(value)
  }, [])

  const handleErrorEvent = useCallback((err) => {
    if (err.Type === AUTH_ERROR_TYPE) {
      setDialogOpen(true)
    }
  }, [])

  useConnectionEvent(ERROR_EVENT, handleErrorEvent)

  useEffect(() => {
    if (password) {
      set(password)
      conn?.emit(AUTH_EVENT, password)
      setDialogOpen(false)
    }
  }, [conn, password])

  return (
    <Dialog fullWidth open={dialogOpen}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>
          Auth required
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            type="password"
            name="password"
            label="Password"
            inputRef={inputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            Enter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
