import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Box, Button, ButtonGroup, Heading } from '@chakra-ui/react'
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
        <Heading as='h4' size='md' my={2} textAlign="center">
          Profile
        </Heading>
        {error && (
          <Alert status='error' my={3}>
            {error}
          </Alert>
        )}
        <Box>
          <strong>Email: </strong>
          {currentUser.email}
        </Box>
        <ButtonGroup my={2}>
          <Button>
            <Link to='/update-profile'>Update Profile</Link>
          </Button>

          <Button onClick={handleLogout}>Log Out</Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default Dashboard
