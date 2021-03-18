import React from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const lightTheme = createMuiTheme()

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export const ThemeProvider = (props) => {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = dark ? darkTheme : lightTheme
  return (
    <MuiThemeProvider {...props} theme={theme} />
  )
}
