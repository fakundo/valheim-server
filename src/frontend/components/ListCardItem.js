import React, { useCallback } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

export default ({ children, item, selected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(item, !selected)
  }, [onSelect, item, selected])

  return (
    <TableRow hover selected={selected} onClick={handleClick}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      { children}
    </TableRow>
  )
}
