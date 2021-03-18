import React, { useEffect, useRef } from 'react'
import Chip from '@material-ui/core/Chip'

export default ({ file }) => {
  const rootRef = useRef()

  useEffect(() => {
    try {
      rootRef.current.click()
    } catch {
      // do nothing
    }
  }, [])

  return (
    <Chip
      ref={rootRef}
      clickable
      component="a"
      target="_blank"
      href={file.url}
      download={file.name}
      label={`Save ${file.name}`}
      color="secondary"
      variant="outlined"
    />
  )
}
