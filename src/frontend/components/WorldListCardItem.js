import React, { memo, useCallback } from 'react'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ListCardItem from 'components/ListCardItem'
import SaveAltIcon from '@material-ui/icons/SaveAlt'

export default memo(({ item, onDownload, ...rest }) => {
  const handleDownloadClick = useCallback((ev) => {
    ev.stopPropagation()
    onDownload(item)
  }, [item, onDownload])

  return (
    <ListCardItem item={item} {...rest}>
      <TableCell style={{ maxWidth: 1, overflow: 'hidden' }}>
        {item.Name}
      </TableCell>
      <TableCell padding="checkbox" align="right">
        {Math.round(item.Size / 1024)}
        {'\u00A0MB'}
      </TableCell>
      <TableCell padding="checkbox">
        <Tooltip title="Download world files">
          <IconButton onClick={handleDownloadClick}>
            <SaveAltIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </ListCardItem>
  )
})
