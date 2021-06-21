import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import Button from '@material-ui/core/Button'

export default () => (
  <Button
    startIcon={<GitHubIcon />}
    component="a"
    href="https://github.com/fakundo/valheim-server"
  >
    valheim-server
  </Button>
)
