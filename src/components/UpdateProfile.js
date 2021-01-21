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

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match")
    }

    const promises = []

    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })

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
          <Heading>Update Profile</Heading>
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
              <Input
                ref={emailRef}
                type='email'
                placeholder='Email'
                defaultValue={currentUser.email}
              />
            </FormControl>
            <FormControl id='password' mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                ref={passwordRef}
                type='password'
                placeholder='Leave blank to keep old password'
              />
            </FormControl>
            <FormControl id='password-confirm' mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                ref={passwordConfirmRef}
                type='password'
                placeholder='Leave blank to keep old password'
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
              Update
            </Button>
          </form>
        </Box>
      </Box>
      <Box textAlign='center' mt={2}>
        <Link to='/'>Cancel</Link>
      </Box>
    </>
  )
}

export default UpdateProfile
