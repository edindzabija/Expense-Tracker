import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button, ButtonGroup } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to Log Out')
    }
  }

  return (
    <div>
      <strong>Email: </strong>
      {currentUser.email}
      {error && (
        <Alert severity='error' my={3}>
          {error}
        </Alert>
      )}
      <ButtonGroup my={2}>
        <Button>
          <Link to='/update-profile'>Update Profile</Link>
        </Button>

        <Button onClick={handleLogout}>Log Out</Button>
      </ButtonGroup>
    </div>
  )
}

export default Dashboard
