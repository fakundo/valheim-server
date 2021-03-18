import React, { useCallback, useState } from 'react'
import { useConnectionEvent, useConnection } from 'hooks'
import ListCard from 'components/ListCard'
import SteamItemAddDialog from 'components/SteamItemAddDialog'
import SteamListCardItem from 'components/SteamListCardItem'

export default ({ listEvent, addEvent, deleteEvent, title, addText }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [items, setItems] = useState()
  const conn = useConnection()

  const handleAddDialogSubmit = useCallback((item) => {
    conn.emit(addEvent, item)
    setAddDialogOpen(false)
  }, [conn])

  const handleDelete = useCallback((deletedItems) => {
    conn.emit(deleteEvent, deletedItems)
  }, [conn])

  const handleAdd = useCallback(() => {
    setAddDialogOpen(true)
  }, [])

  const handleAddDialogClose = useCallback(() => {
    setAddDialogOpen(false)
  }, [])

  const handleAdminsEvent = useCallback((nextItems) => {
    setItems(nextItems.reverse())
  }, [])

  useConnectionEvent(listEvent, handleAdminsEvent)

  return (
    <>
      {!!items && (
        <SteamItemAddDialog
          title={addText}
          open={addDialogOpen}
          onClose={handleAddDialogClose}
          onSubmit={handleAddDialogSubmit}
        />
      )}
      <ListCard
        items={items}
        getItemKey={(item) => item}
        renderItem={(props) => <SteamListCardItem {...props} />}
        cols={['SteamID64']}
        title={title}
        addText={addText}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </>
  )
}
