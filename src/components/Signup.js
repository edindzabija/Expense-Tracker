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

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match")
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create account!')
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
          <Heading>Sign Up</Heading>
        </Box>
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
            <FormControl id='password-confirm' mt={6} isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                ref={passwordConfirmRef}
                type='password'
                placeholder='*******'
              />
            </FormControl>
            <Button
              disabled={loading}
              type='submit'
              colorScheme='teal'
              variant='outline'
              width='full'
              mt={4}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
      <Box textAlign='center' mt={2}>
        Already have an account? <Link to='/login'>Log In</Link>
      </Box>
    </>
  )
}

export default Signup
