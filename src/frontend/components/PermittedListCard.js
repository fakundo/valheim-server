import React from 'react'
import { PERMITTED_EVENT, PERMITTED_ADD_EVENT, PERMITTED_DELETE_EVENT } from 'constants/events'
import SteamListCard from 'components/SteamListCard'

export default () => (
  <SteamListCard
    listEvent={PERMITTED_EVENT}
    addEvent={PERMITTED_ADD_EVENT}
    deleteEvent={PERMITTED_DELETE_EVENT}
    title="Permitted list"
    addText="Add permitted"
  />
)
