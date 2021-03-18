import React from 'react'
import { BANNED_EVENT, BANNED_ADD_EVENT, BANNED_DELETE_EVENT } from 'constants/events'
import SteamListCard from 'components/SteamListCard'

export default () => (
  <SteamListCard
    listEvent={BANNED_EVENT}
    addEvent={BANNED_ADD_EVENT}
    deleteEvent={BANNED_DELETE_EVENT}
    title="Banned list"
    addText="Add banned"
  />
)
