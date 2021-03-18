import React, { useCallback, useEffect, useState } from 'react'
import { WORLD_EVENT, WORLD_GET_EVENT } from 'constants/events'
import { useConnection, useConnectionEvent } from 'hooks'
import { createFileURL } from 'utils'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import WorldGetDialogFile from 'components/WorldGetDialogFile'

export default ({ world, onClose }) => {
  const [files, setFiles] = useState()
  const conn = useConnection()

  const handleWorldEvent = useCallback((worldData) => {
    if (worldData.Name === world?.Name) {
      setFiles({
        db: {
          name: `${worldData.Name}.db`,
          url: createFileURL(worldData.DB),
        },
        fwl: {
          name: `${worldData.Name}.fwl`,
          url: createFileURL(worldData.FWL),
        },
      })
    }
  }, [world])

  useConnectionEvent(WORLD_EVENT, handleWorldEvent)

  useEffect(() => {
    if (world) {
      setFiles(null)
      conn.emit(WORLD_GET_EVENT, world.Name)
    }
  }, [conn, world])

  return (
    <Dialog fullWidth open={!!world} onClose={onClose}>
      <DialogTitle>
        Download world
      </DialogTitle>
      <DialogContent>
        {files
          ? (
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography color="textSecondary">
                  Files are ready for save
                </Typography>
              </Grid>
              <Grid item>
                <WorldGetDialogFile file={files.db} />
              </Grid>
              <Grid item>
                <WorldGetDialogFile file={files.fwl} />
              </Grid>
            </Grid>
          )
          : (
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <CircularProgress size={24} color="primary" />
              </Grid>
              <Grid item>
                <Typography color="textSecondary">
                  Downloading files, please wait...
                </Typography>
              </Grid>
            </Grid>
          )
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
