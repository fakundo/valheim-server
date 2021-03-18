import React from 'react'
import { ADMINS_EVENT, ADMIN_ADD_EVENT, ADMINS_DELETE_EVENT } from 'constants/events'
import SteamListCard from 'components/SteamListCard'

export default () => (
  <SteamListCard
    listEvent={ADMINS_EVENT}
    addEvent={ADMIN_ADD_EVENT}
    deleteEvent={ADMINS_DELETE_EVENT}
    title="Admin list"
    addText="Add admin"
  />
)
