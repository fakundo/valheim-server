import React, { useCallback, useState } from 'react'
import { useConnectionEvent, useConnection } from 'hooks'
import { WORLDS_EVENT, WORLDS_DELETE_EVENT } from 'constants/events'
import ListCard from 'components/ListCard'
import WorldListCardItem from 'components/WorldListCardItem'
import WorldGetDialog from 'components/WorldGetDialog'
import WorldAddDialog from 'components/WorldAddDialog'

export default () => {
  const [getDialogWorld, setGetDialogWorld] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [worlds, setWorlds] = useState()
  const conn = useConnection()

  const handleDelete = useCallback((deletedWorldNames) => {
    conn.emit(WORLDS_DELETE_EVENT, deletedWorldNames)
  }, [conn])

  const handleAdd = useCallback(() => {
    setAddDialogOpen(true)
  }, [])

  const handleDownload = useCallback((world) => {
    setGetDialogWorld(world)
  }, [])

  const handleAddDialogClose = useCallback(() => {
    setAddDialogOpen(false)
  }, [])

  const handleGetDialogClose = useCallback(() => {
    setGetDialogWorld(null)
  }, [])

  const handleWorldsEvent = useCallback((nextWorlds) => {
    setWorlds(nextWorlds)
  }, [])

  useConnectionEvent(WORLDS_EVENT, handleWorldsEvent)

  return (
    <>
      { !!worlds && (
        <WorldGetDialog
          world={getDialogWorld}
          onClose={handleGetDialogClose}
        />
      )}
      { !!worlds && (
        <WorldAddDialog
          open={addDialogOpen}
          onClose={handleAddDialogClose}
        />
      )}
      <ListCard
        items={worlds}
        getItemKey={(world) => world.Name}
        renderItem={(props) => <WorldListCardItem onDownload={handleDownload} {...props} />}
        cols={['Name', 'Size', '']}
        title="World list"
        addText="Upload world"
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </>
  )
}
