import React, { useCallback, useState, useRef } from 'react'
import { useConnectionEvent, useConnection } from 'hooks'
import { STATE_EVENT, WORLDS_EVENT, SERVER_STOP_EVENT } from 'constants/events'
import { STOPPED_STATUS, RUNNING_STATUS } from 'constants/serverStatuses'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import StatusStartDialog from 'components/StatusStartDialog'
import StatusContent from 'components/StatusContent'
import CardSkeleton from 'components/CardSkeleton'
import ShadeBox from 'components/ShadeBox'
import StopIcon from '@material-ui/icons/Stop'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

export default () => {
  const worldsRef = useRef([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [serverState, setServerState] = useState()
  const conn = useConnection()

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const handleStartClick = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const handleStopClick = useCallback(() => {
    conn.emit(SERVER_STOP_EVENT)
  }, [conn])

  const handleStateEvent = useCallback((statusState) => {
    setServerState(statusState)
  }, [])

  const handleWorldsEvent = useCallback((worlds) => {
    worldsRef.current = worlds
  }, [])

  useConnectionEvent(STATE_EVENT, handleStateEvent)
  useConnectionEvent(WORLDS_EVENT, handleWorldsEvent)

  return (
    <>
      {!!serverState && (
        <StatusStartDialog
          open={dialogOpen}
          worlds={worldsRef.current}
          options={serverState.Options}
          onClose={handleDialogClose}
        />
      )}
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader subheader="Server status" />
        <Divider />
        <CardContent style={{ flex: 1 }}>
          {serverState
            ? (
              <ShadeBox>
                <StatusContent serverState={serverState} />
              </ShadeBox>
            )
            : <CardSkeleton />
          }
        </CardContent>
        <Divider />
        <CardActions>
          {serverState
            ? (
              <>
                <Button
                  color="primary"
                  onClick={handleStartClick}
                  disabled={!!serverState && serverState.Status !== STOPPED_STATUS}
                >
                  <PlayArrowIcon />
                  &nbsp;
                  Start
                </Button>
                <Button
                  color="primary"
                  onClick={handleStopClick}
                  disabled={!!serverState && serverState.Status !== RUNNING_STATUS}
                >
                  <StopIcon />
                  &nbsp;
                  Stop
                </Button>
              </>
            )
            : <CardSkeleton width={120} />
          }
        </CardActions>
      </Card>
    </>
  )
}
