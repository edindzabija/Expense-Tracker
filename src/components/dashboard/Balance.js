import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { format } from 'date-fns'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

const Balance = () => {
  const classes = useStyles()
  const bl = 3800.5

  const [balance, setBalance] = useState(bl)
  const [showBalance, setShowBalance] = useState(false)

  const hideBalanceHandler = () => {
    setShowBalance(!showBalance)
  }

  useEffect(() => {
    setBalance(bl)
  }, [])
  return (
    <React.Fragment>
      <Title>Current Balance</Title>
      <Typography component='p' variant='h4'>
        {showBalance ? `$ ${balance}` : `*****`}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {format(new Date(), 'dd MMM yyyy')}
      </Typography>
      <div>
        <Button color='primary' onClick={hideBalanceHandler}>
          {showBalance ? `Hide balance` : `Show Balance`}
        </Button>
      </div>
    </React.Fragment>
  )
}
export default Balance
