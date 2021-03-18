import React, { useEffect, useCallback, useRef } from 'react'
import { useConnectionEvent } from 'hooks'
import { OUTPUT_EVENT } from 'constants/events'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ShadeBox from 'components/ShadeBox'

export default () => {
  const attToBotRef = useRef(true)
  const scrollRef = useRef()
  const outputRef = useRef()

  const handleWheel = useCallback(() => {
    const { scrollHeight, clientHeight, scrollTop } = scrollRef.current
    attToBotRef.current = scrollTop + clientHeight >= scrollHeight - 40
  }, [])

  const handleOutputEvent = useCallback((output) => {
    outputRef.current.innerText += output
    if (attToBotRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
    }
  }, [])

  useConnectionEvent(OUTPUT_EVENT, handleOutputEvent)

  useEffect(() => {
    outputRef.current.innerText = 'No output yet...\n'
  }, [])

  return (
    <Card>
      <CardHeader subheader="Process output" />
      <Divider />
      <CardContent>
        <ShadeBox
          ref={scrollRef}
          style={{ overflow: 'auto', height: 234, maxHeight: '50vh' }}
          onWheel={handleWheel}
        >
          <Box px={2}>
            <Typography
              component="div"
              color="textSecondary"
            >
              <pre
                ref={outputRef}
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
              />
            </Typography>
          </Box>
        </ShadeBox>
      </CardContent>
    </Card>
  )
}
