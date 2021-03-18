import React, { useCallback, useState, Fragment } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import CardSkeleton from 'components/CardSkeleton'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

export default ({ items, getItemKey, renderItem, cols, title, addText, onAdd, onDelete }) => {
  const [selected, setSelected] = useState([])

  const handleAllCheckboxChange = useCallback((ev) => {
    if (ev.target.checked) {
      setSelected(items?.map(getItemKey))
    } else {
      setSelected([])
    }
  }, [items])

  const handleSelect = useCallback((item, itemSelected) => {
    setSelected((prevSelected) => {
      const itemKey = getItemKey(item)
      let nextSelected = prevSelected
      if (itemSelected) {
        nextSelected = [...prevSelected, itemKey]
      } else {
        nextSelected = prevSelected.filter((i) => i !== itemKey)
      }
      return nextSelected
    })
  }, [])

  const handleDeleteClick = useCallback(() => {
    onDelete(selected)
    setSelected([])
  }, [selected, onDelete])

  return (
    <Card>
      <CardHeader subheader={`${title} – ${items?.length || 0}`} />
      <Divider />
      <TableContainer style={{ height: 234, maxHeight: '50vh' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={!!items?.length && items.length === selected.length}
                  onChange={handleAllCheckboxChange}
                />
              </TableCell>
              {cols.map((col) => (
                <TableCell key={col}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => {
              const itemKey = getItemKey(item)
              return (
                <Fragment key={itemKey}>
                  {renderItem({
                    item,
                    onSelect: handleSelect,
                    selected: selected.includes(itemKey),
                  })}
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
        <CardContent>
          {!items && <CardSkeleton />}
          {items && !items.length && (
            <Box py={2}>
              <Typography
                align="center"
                variant="body2"
                color="textSecondary"
              >
                The list is empty
              </Typography>
            </Box>
          )}
        </CardContent>
      </TableContainer>
      <Divider />
      <CardActions>
        {!items && <CardSkeleton width={120} />}
        {!!items && !selected.length && (
          <Button
            color="primary"
            onClick={onAdd}
          >
            <AddIcon />
            &nbsp;
            {addText}
          </Button>
        )}
        {!!items && !!selected.length && (
          <Button
            color="secondary"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
            &nbsp;
            Remove selected
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
