import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Box, Button } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'

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
    <>
      <Box>
        <h2>Profile</h2>
        {error && (
          <Alert status='error' my={3}>
            {error}
          </Alert>
        )}
        <strong>Email: </strong>
        <Link to='/update-profile'>Update Profile</Link>
        {currentUser.email}
        <Button onClick={handleLogout}>Log Out</Button>
      </Box>
    </>
  )
}

export default Dashboard
