import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from './Title'

// Generate Dummy Expense Data
function createData(id, date, name, category, note, amount) {
  return { id, date, name, category, note, amount }
}

const rows = [
  createData(0, '15 Jan, 2021', 'Electricity', 'Household', 'Necesity', 34.0),
  createData(0, '08 Jan, 2021', 'MacBook Pro', 'Work', 'New Computer', 3312.0),
  createData(0, '16 Feb, 2019', 'Kirija', 'Household', 'flat', 320.0),
]

function preventDefault(event) {
  event.preventDefault()
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

export default function Expenses() {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Recent Expenses</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell width={200}>Date</TableCell>
            <TableCell width={220}>Expense Name</TableCell>
            <TableCell width={220}>Category</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell align='right'>-{row.amount} KM</TableCell>
              </TableRow>
            ))
            .slice(0, 2)}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button color='primary' onClick={preventDefault}>
          Add New Expense
        </Button>
      </div>
    </React.Fragment>
  )
}
