import React, { memo } from 'react'
import TableCell from '@material-ui/core/TableCell'
import ListCardItem from 'components/ListCardItem'

export default memo((props) => (
  <ListCardItem {...props}>
    <TableCell style={{ maxWidth: 1, overflow: 'hidden' }}>
      {props.item}
    </TableCell>
  </ListCardItem>
))
