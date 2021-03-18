import React, { useCallback, useState } from 'react'
import { useConnectionEvent } from 'hooks'
import { PERF_EVENT } from 'constants/events'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ShadeBox from 'components/ShadeBox'
import PerfChart from 'components/PerfChart'
import CardSkeleton from 'components/CardSkeleton'

export default () => {
  const [perf, setPerf] = useState()

  const handlePerfEvent = useCallback((data) => {
    setPerf(data)
  }, [])

  useConnectionEvent(PERF_EVENT, handlePerfEvent)

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader subheader="Performance monitor" />
      <Divider />
      <CardContent>
        {perf
          ? (
            <ShadeBox px={1} py={2}>
              <PerfChart perf={perf} />
            </ShadeBox>
          )
          : <CardSkeleton />
        }
      </CardContent>
    </Card>
  )
}
