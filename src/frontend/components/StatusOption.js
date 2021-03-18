import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default ({ title, value }) => (
  <Grid container spacing={1} alignItems="baseline">
    <Grid item xs={12} sm={3} style={{ flexShrink: 0 }}>
      <Typography variant="caption" color="textSecondary">
        {`${title}`}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2">
        {value || '–'}
      </Typography>
    </Grid>
  </Grid>
)
