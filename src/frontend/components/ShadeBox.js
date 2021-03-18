import React, { forwardRef } from 'react'
import Box from '@material-ui/core/Box'

export default forwardRef((props, ref) => (
  <Box
    ref={ref}
    border={1}
    borderColor="divider"
    borderRadius="borderRadius"
    bgcolor="background.default"
    {...props}
  />
))
