import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions.')
    } catch {
      setError('Failed to Reset Password')
    }

    setLoading(false)
  }

  return (
    <>
      <Box
        p={8}
        maxWidth='500px'
        borderWidth={1}
        borderRadius={8}
        boxShadow='lg'
      >
        <Box textAlign='center'>
          <Heading>Password Reset</Heading>
        </Box>
        {error && (
          <Alert status='error' my={3}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert status='success' my={3}>
            {message}
          </Alert>
        )}
        <Box my={4} textAlign='left'>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired id='email'>
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} type='email' placeholder='test@test.com' />
            </FormControl>

            <Button
              disabled={loading}
              type='submit'
              colorScheme='teal'
              variant='outline'
              width='full'
              mt={4}
            >
              Reset Password
            </Button>
          </form>
          <Box textAlign='center' mt={5}>
            <Link to='/login'>Login</Link>
          </Box>
        </Box>
      </Box>
      <Box textAlign='center' mt={2}>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </Box>
    </>
  )
}

export default ForgotPassword
