import React from 'react'
import { ConnectionProvider, ThemeProvider } from 'providers'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ErrorSnackbar from 'components/ErrorSnackbar'
import AuthDialog from 'components/AuthDialog'
import Container from 'components/Container'
import Header from 'components/Header'
import Footer from 'components/Footer'
import StatusCard from 'components/StatusCard'
import OutputCard from 'components/OutputCard'
import PerfCard from 'components/PerfCard'
import WorldListCard from 'components/WorldListCard'
import AdminListCard from 'components/AdminListCard'
import BannedListCard from 'components/BannedListCard'
import PermittedListCard from 'components/PermittedListCard'

export default () => (
  <ThemeProvider>
    <CssBaseline />
    <ConnectionProvider>
      <ErrorSnackbar />
      <AuthDialog />
      <Container>
        <Box mt={4}>
          <Header />
        </Box>
        <Box mt={4}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <StatusCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <PerfCard />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <OutputCard />
        </Box>
        <Box my={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <WorldListCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminListCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <BannedListCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <PermittedListCard />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4} mb={4}>
          <Footer />
        </Box>
      </Container>
    </ConnectionProvider>
  </ThemeProvider>
)
