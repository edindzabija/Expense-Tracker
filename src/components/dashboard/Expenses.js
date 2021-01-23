import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from './Title'
import useFirestore from '../../hooks/useFirestore'
import { format } from 'date-fns'
import { fromUnixTime } from 'date-fns'
// Generate Dummy Expense Data
function createData(id, date, name, category, desc, amount) {
  return { id, date, name, category, desc, amount }
}

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

  const { docs } = useFirestore('transactions')
  console.log('data: ', docs)

  const rows = []

  if (docs) {
    for (let i = 0; i < docs.length; i++) {
      const e = docs[i]
      rows.push(
        createData(
          e.id,
          format(fromUnixTime(e.date.seconds), 'dd MMM yyyy'),
          e.name,
          e.category,
          e.desc,
          e.amount
        )
      )
    }
  }
  // format(e.date[i].seconds, 'yyyy-MM-dd')
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell align='right'>-{row.amount} KM</TableCell>
            </TableRow>
          ))}
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
