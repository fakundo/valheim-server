import React, { useCallback, useState } from 'react'
import { useConnectionEvent } from 'hooks'
import { ERROR_EVENT } from 'constants/events'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default () => {
  const [state, setState] = useState({})

  const handleClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, open: false }))
  }, [])

  const handleErrorEvent = useCallback((error) => {
    setState({ error, open: true })
  }, [])

  useConnectionEvent(ERROR_EVENT, handleErrorEvent)

  return (
    <Snackbar
      open={!!state.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        {state.error?.Message || JSON.stringify(state.error) || ''}
      </Alert>
    </Snackbar>
  )
}
