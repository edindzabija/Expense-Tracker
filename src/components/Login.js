import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from '@chakra-ui/react'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { login } = useAuth()

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to Log In')
    }

    setLoading(false)
  }

  return (
    <Box p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
      <Box textAlign='center'>
        <Heading>Log In</Heading>
      </Box>
      {/* {currentUser && currentUser.email} */}
      {error && (
        <Alert status='error' my={3}>
          {error}
        </Alert>
      )}
      <Box my={4} textAlign='left'>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired id='email'>
            <FormLabel>Email</FormLabel>
            <Input ref={emailRef} type='email' placeholder='test@test.com' />
          </FormControl>
          <FormControl id='password' mt={6} isRequired>
            <FormLabel>Password</FormLabel>
            <Input ref={passwordRef} type='password' placeholder='*******' />
          </FormControl>

          <Button
            disabled={loading}
            type='submit'
            colorScheme='teal'
            variant='outline'
            width='full'
            mt={4}
          >
            Log In
          </Button>
        </form>
      </Box>
      Need an account? <Link to='/signup'>Sign Up</Link>
    </Box>
  )
}

export default Login
