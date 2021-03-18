import React, { useCallback, useEffect, useState } from 'react'
import { WORLDS_EVENT, WORLD_ADD_EVENT } from 'constants/events'
import { useConnection, useConnectionEvent } from 'hooks'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PublishIcon from '@material-ui/icons/Publish'

export default ({ open, onClose }) => {
  const [state, setState] = useState()
  const conn = useConnection()

  const handleFilesChange = useCallback((selectedFiles) => {
    const db = selectedFiles.find((file) => file.name.split('.')[1] === 'db')
    if (db) {
      const worldName = db.name.split('.')[0]
      const fwl = selectedFiles.find((file) => {
        const [name, ext] = file.name.split('.')
        return name === worldName && ext === 'fwl'
      })
      if (fwl) {
        // supress dropzone setState warning
        setTimeout(setState, 0, { worldName, db, fwl, pending: false })
      }
    }
  }, [])

  const handleUploadClick = useCallback(async () => {
    setState((prevState) => (
      { ...prevState, pending: true }
    ))
    conn.emit(WORLD_ADD_EVENT, {
      Name: state.worldName,
      DB: await state.db.arrayBuffer(),
      FWL: await state.fwl.arrayBuffer(),
    })
  }, [state, conn])

  const handleWorldsEvent = useCallback((worlds) => {
    if (
      state?.pending
      && worlds.find(({ Name }) => state?.worldName === Name)
    ) {
      onClose()
    }
  }, [state, onClose])

  useConnectionEvent(WORLDS_EVENT, handleWorldsEvent)

  useEffect(() => {
    if (open) {
      setState(null)
    }
  }, [open])

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        Upload world
      </DialogTitle>
      <DialogContent>
        {state
          ? (
            <Typography color="textSecondary">
              {'Attached world name – '}
              <strong>{state.worldName}</strong>
              . Click Upload button to continue.
              After the upload is complete,
              use this world name in the server startup options.
            </Typography>
          )
          : (
            <DropzoneArea
              clearOnUnmount
              showAlerts={false}
              showPreviewsInDropzone={false}
              maxFileSize={Infinity}
              onChange={handleFilesChange}
              dropzoneText="Click here or drop *.db and *.fwl files"
              Icon={PublishIcon}
            />
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!state || state.pending}
          onClick={handleUploadClick}
        >
          {state?.pending
            ? (
              <>
                <CircularProgress size={16} color="primary" />
                &nbsp;
                Uploading
              </>
            )
            : 'Upload'
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}
