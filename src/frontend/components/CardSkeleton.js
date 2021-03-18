import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

export default (props) => (
  <Skeleton
    height={36}
    animation="wave"
    style={{ maxWidth: '100%' }}
    {...props}
  />
)
